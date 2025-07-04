import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WidgetInterface } from '../widget/widget';
import { WidgetsService } from '../widgets-service';

export interface LoactionInterface {name: string, latLng: {lat: number, lng: number}, description: string}

export const defaultLocations: LoactionInterface[] = [
    { name: 'Heinzelova 70', latLng: {lat: 45.804686354098635, lng: 16.00787966861684}, description: 'Comping HQ'},
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

  locations: LoactionInterface[] = defaultLocations

  constructor(private widgetService: WidgetsService) {}

  ngOnInit(): void {
    this.locations = this.widget.locations!
    this.widgetService.updateMarkers(this.widget.locations!, this.widget)
  }

  onChangeLocation(location: LoactionInterface) {
    this.widgetService.updateCenterLatLng(location.latLng.lat, location.latLng.lng, this.widget.controls!)
  }
}
