import { Component, Input } from '@angular/core';
import { LeafletDirective } from '@bluehalo/ngx-leaflet';
import { WidgetInterface } from '../widget/widget';
import { control, icon, latLng, Map, marker, tileLayer } from 'leaflet';
import { iconPNG } from '../../app';

@Component({
  selector: 'app-widget-map',
  imports: [LeafletDirective],
  templateUrl: './widget-map.html',
  styleUrl: './widget-map.scss'
})
export class WidgetMap {
  @Input() widget!: WidgetInterface

  locations: {name: string, latLng: [number, number]}[] = [
    { name: 'Heinzelova 70', latLng: [45.804686354098635, 16.00787966861684] },
    { name: 'Trg bana Josipa Jelačića', latLng: [45.81324918928916, 15.97735111094576] },
    { name: 'HNK', latLng: [45.80975723831787, 15.969805063066701] },
    { name: 'Glavni Kolodvor', latLng: [45.80473828332682, 15.978769282109697] },
    { name: 'Autobusni Kolodvor', latLng: [45.804391097545974, 15.993206609095234] },
    { name: 'Jarun', latLng: [45.780687368857066, 15.91743673689596] },
    { name: 'Bundek', latLng: [45.78539319986199, 15.986879256856362] },
    { name: 'Maksimir', latLng: [45.824543503132176, 16.01754417423182] },
    { name: 'Cibona', latLng: [45.80319059939342, 15.963846082109576] },
    { name: 'Arena', latLng: [45.77136219265469, 15.943632797451126] },
  ]

  locationMarkers = this.locations.map(location => {
          return marker(location.latLng, { icon: iconPNG() })
        })

  mapLayers = [
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }),
    ...this.locationMarkers
  ]
  options = {
    layers: this.mapLayers,
    zoom: 18,
    zoomControl: false,
    center: latLng(45.804686354098635, 16.00787966861684),
  };

  onMapReady(map: Map) {
    map.addControl(control.zoom({ position: 'topright' }));
  }
}
