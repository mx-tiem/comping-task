import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WidgetInterface } from '../widget/widget';
import { WidgetsService } from '../widgets-service';

export const defaultLocations: {name: string, latLng: [number, number], description: string}[] = [
    { name: 'Heinzelova 70', latLng: [45.804686354098635, 16.00787966861684], description: 'Comping HQ'},
    { name: 'Trg bana Josipa Jelačića', latLng: [45.81324918928916, 15.97735111094576], description: 'The central city square and vibrant heart of Zagreb, where historic architecture meets modern city life.'},
    { name: 'HNK', latLng: [45.80975723831787, 15.969805063066701], description: 'A grandiose neo-baroque theater showcasing Croatian opera, ballet, and drama in an opulent setting.'},
    { name: 'Glavni Kolodvor', latLng: [45.80473828332682, 15.978769282109697], description: 'Zagreb’s main railway station, an elegant 19th-century building that serves as a gateway to domestic and international train travel.'},
    { name: 'Autobusni Kolodvor', latLng: [45.804391097545974, 15.993206609095234], description: 'The city’s central bus terminal, a functional hub connecting Zagreb to regional and European destinations.'},
    { name: 'Jarun', latLng: [45.780687368857066, 15.91743673689596], description: 'A scenic lake and recreational area popular for kayaking, cycling, and Zagreb’s lively summer nightlife scene.'},
    { name: 'Bundek', latLng: [45.78539319986199, 15.986879256856362], description: 'A peaceful urban park and lake ideal for picnics, jogging, or relaxing by the water amidst landscaped greenery.'},
    { name: 'Maksimir', latLng: [45.824543503132176, 16.01754417423182], description: 'Home to Zagreb’s largest park and zoo, a vast green space filled with walking trails, lakes, and forested areas.'},
    { name: 'Cibona', latLng: [45.80319059939342, 15.963846082109576], description: 'A sports complex best known for the iconic Cibona Tower and the basketball club that has brought pride to the city.'},
    { name: 'Arena', latLng: [45.77136219265469, 15.943632797451126], description: 'A massive modern multipurpose venue that hosts everything from concerts and sporting events to large international exhibitions.'},
  ]

const testLocations: {name: string, latLng: [number, number], description: string}[] = [
  { name: 'Zagreb #1', latLng: [45.815399, 15.966568], description: 'Zagreb location #1'},
  { name: 'Zagreb #2', latLng: [45.812764, 15.977111], description: 'Zagreb location #2'},
  { name: 'Zagreb #3', latLng: [45.821585, 15.955215], description: 'Zagreb location #3'},
  { name: 'Zagreb #4', latLng: [45.807397, 15.981849], description: 'Zagreb location #4'},
  { name: 'Zagreb #5', latLng: [45.826120, 15.965410], description: 'Zagreb location #5'},
]

@Component({
  selector: 'app-locations-list',
  imports: [MatCardModule, MatChipsModule, MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './locations-list.html',
  styleUrl: './locations-list.scss'
})
export class LocationsList implements OnInit{
  @Input() widget!: WidgetInterface

  locations = defaultLocations

  constructor(private widgetService: WidgetsService) {}

  ngOnInit(): void {
    this.widget.id == 6 && (this.locations = testLocations)
    this.widgetService.updateMarkers(this.locations, this.widget)
  }

  onChangeLocation(location: any) {
    this.widgetService.updateCenterLatLng(location.latLng[0], location.latLng[1], this.widget.controls!)
  }
}
