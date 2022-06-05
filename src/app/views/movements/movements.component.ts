import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Card} from "../../models/card";
import {MatSelectChange} from "@angular/material/select";
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import {CardService} from "../../api/card.service";
import {MovementsApi} from "../../models/movement";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'ae-movements',
  template: `
    <div>
      <mat-form-field appearance="fill">
        <mat-label>Seleziona una carta</mat-label>
        <mat-select (selectionChange)="onSelectionChange($event)" [value]="selectedCardId$ | async">
          <mat-option *ngFor="let card of (cards$ | async)" [value]="card._id">
            {{card.number}}
          </mat-option>
          <mat-option [value]="'zaq1xsw2cde3vfr4'">
            0123456789012345 (FAKE)
          </mat-option>
        </mat-select>
      </mat-form-field>

      <ng-container *ngIf="(selectedCard$ | async) as selectedCard; else noCardRef">
        <h2>Saldo: {{selectedCard.amount | currency: 'EUR'}}</h2>
        <h3>Totale spese: {{total$ | async | currency: 'EUR'}}</h3>

        <div class="movements">
          <!--TODO: The movement component should be refactored. We might want to also transfer the value "total" from movements$.-->
          <ng-container *ngIf="(movements$ | async)?.data as movements">
            <ae-movement
              *ngFor="let movement of movements"
              [title]="movement.title"
              [description]="movement.description"
              [amount]=movement.amount
              [type]="movement.type"
              [date]="movement.timestamp | date: 'dd/MM/yyyy'"
            >
            </ae-movement>
          </ng-container>
        </div>

        <button *ngIf="shouldLoadMore$ | async" (click)="onLoadMore(selectedCard)" class="load-more" mat-stroked-button>
          Carica altro
        </button>
      </ng-container>

      <ng-template #noCardRef>
        <h2>Saldo: ---</h2>
        <h3>Totale spese: ---</h3>
      </ng-template>
    </div>
  `,
  styles: [`
    .load-more {
      width: 100%;
      margin-top: 20px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementsComponent implements OnInit {

  cards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([])

  // TODO: It would be cool to use merge() and combine _activatedRoute.params with matSelect.optionSelectionChanges.
  //  The problem though, is that the matSelect will only be available from the ngOnInt at best...
  selectedCardId$: Observable<string | null> = this._activatedRoute.params.pipe(
    map(params => {
      if (!params || Object.keys(params).length === 0 || !params['cardId'])
        return null

      return params['cardId']
    })
  );

  selectedCard$: Observable<Card | null> = combineLatest([this.cards$, this.selectedCardId$]).pipe(
    map(combinedValues => {
      const [cards, selectedCardId] = combinedValues

      const card = cards.find(element => {
        return element._id === selectedCardId
      })

      return card ? card : null
    })
  );

  total$: Observable<number | null> = this.selectedCard$.pipe(
    map(card => {
      if (!card || !card.movements)
        return null

      return card.movements.reduce((total, element) => {
        // We need the plus, since the backend has a bug where sometimes returns the amount as string.
        const amount = +element.amount as number

        return total + amount
      }, 0)
    })
  )

  movements$: BehaviorSubject<MovementsApi | null> = new BehaviorSubject<MovementsApi | null>(null)

  singleChunk: number = 5

  loadedChunk: number = 0

  // TODO: We do not handle the offset for now.
  //  This means that each call will retrieve all the movements and override the ones already stored.
  // offset: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  shouldLoadMore$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _cardService: CardService
  ) {
    this._cardService.getCards().subscribe(cards => {
      this.cards$.next(cards)
    })
  }

  ngOnInit(): void {
    this.selectedCardId$.subscribe(selectedCardId => {
      if (!selectedCardId)
        return

      // Load the first movements from url.
      this.loadMovements(selectedCardId, this.singleChunk)
    })
  }

  onSelectionChange(event: MatSelectChange) {
    if (!event.value) {
      this.dispose()
      return;
    }

    const cardId = event.value
    this._router.navigateByUrl('/dashboard/movements/' + cardId).then(console.log)
  }

  onLoadMore(card: Card) {
    this.loadMovements(card._id, this.loadedChunk + this.singleChunk)
  }

  loadMovements(cardId: string, chunk: number) {
    this._cardService.getCardMovements(cardId, chunk).subscribe(movements => {
      // Double check if the server responded with an empty object.
      if (!movements || Object.keys(movements).length === 0) {
        this.movements$.next(null)
        this.shouldLoadMore$.next(true)
        // this.dispose() // This method might be more appropriate.
        return
      }

      // Inject the new movements.
      this.movements$.next(movements)

      // Determine if we could load more movements.
      this.shouldLoadMore$.next(movements.data.length < movements.total)

      // Update chunk status.
      this.loadedChunk += this.singleChunk
    })
  }

  dispose() {
    this.movements$.next(null)
    this.shouldLoadMore$.next(true)
  }

}
