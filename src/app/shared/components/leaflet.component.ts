import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'ae-leaflet',
  template: `
    <div #host style="width: 400px; height: 200px"></div>
  `,
  styles: [`
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeafletComponent implements OnInit, OnChanges {

  @ViewChild('host', {static: true}) host!: ElementRef<HTMLDivElement>;

  @Input() coords: number[] | null = null;

  @Input() zoom: number = 5;

  @Input() markerText: string | null = 'Default boring marker.';

  map!: L.Map;

  marker!: L.Marker;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // TODO: leaflet does not import correctly the marker-shadow image, see the console "http://localhost:4200/marker-shadow.png".
    // TODO: The markerText is disabled, since when it's closed it will automatically redirect to "/#closed".

    // The first time the component is rendered.
    if (changes['coords'] && changes['coords'].firstChange) {
      const coords: L.LatLngExpression = this.coords as L.LatLngExpression;
      this.map = L.map(this.host.nativeElement).setView(coords, this.zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

      this.marker = L.marker(coords)
        .addTo(this.map)
        // .bindPopup(this.markerText)
        .openPopup();
    }

    // Any following changes to the coords.
    if (changes['coords'] && !changes['coords'].firstChange) {
      const coords: L.LatLngExpression = this.coords as L.LatLngExpression;
      this.map.setView(coords);
      this.marker
        .setLatLng(coords)
      // .bindPopup(this.markerText);
    }

    // Any following changes to the zoom.
    if (changes['zoom'] && !changes['zoom'].firstChange)
      this.map.setZoom(changes['zoom'].currentValue);

    // For some reason (probably related to the dynamic size), the component inside a drawer does not visualize the map correctly...
    // This fixes the issue somehow. It will always be executed with any kind of data change...
    // @link https://stackoverflow.com/questions/15089541/leaflet-map-loading-half-greyed-tiles
    setTimeout(() => {
      this.map.invalidateSize()
    }, 100)
  }

}
