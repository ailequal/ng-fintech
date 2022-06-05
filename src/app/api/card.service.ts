import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Card, CardForm} from "../models/card";
import {Movement, MovementsApi} from "../models/movement";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private _http: HttpClient) {
  }

  getCards(): Observable<Card[]> {
    return this._http.get<Card[]>(environment.apiUrl + '/cards');
  }

  setCard(cardForm: CardForm): Observable<Card> {
    return this._http.post<Card>(environment.apiUrl + '/cards', cardForm);
  }

  deleteCard(cardId: string): Observable<boolean> {
    return this._http.delete<boolean>(environment.apiUrl + '/cards/' + cardId)
  }

  getCardMovements(cardId: string, limit: number = 5, offset: number = 0): Observable<MovementsApi> {
    return this._http.get<MovementsApi>(environment.apiUrl + '/cards/' + cardId + '/movements', {
      params: {
        limit: limit,
        offset: offset
      }
    });
  }

}
