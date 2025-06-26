import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WidgetInterface } from './widget/widget';

interface LatLngControlInterface {lat: number, lng: number, control: string}
interface MarkerControlInterface {lat: number, lng: number, control: string}

export const initialCenterLatLng: LatLngControlInterface = {
  lat: 45.804686354098635,
  lng: 16.00787966861684,
  control: 'all'
}

const initialMarkerControl: MarkerControlInterface[] = [{
  lat: 45.804686354098635,
  lng: 16.00787966861684,
  control: 'all'
}]

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {
  private centerLatLng = new BehaviorSubject<LatLngControlInterface>(initialCenterLatLng);
  currentCenterLatLng = this.centerLatLng.asObservable();

  private allMarkers = new BehaviorSubject<MarkerControlInterface[]>(initialMarkerControl);
  currentMarkers = this.allMarkers.asObservable();

  constructor() {}

  updateCenterLatLng(lat: number, lng: number, control: string) {
    this.centerLatLng.next({lat: lat, lng: lng, control: control});
  }

  updateMarkers(locations: {name: string, latLng: [number, number], description: string}[], widget: WidgetInterface) {
    let newMakersList: {lat: number, lng: number, control: string}[] = []
    locations.forEach(location => {
      const newMarker = {
        lat: location.latLng[0],
        lng: location.latLng[1],
        control: widget.controls!
      }
      if (!this.currentMarkersInclude(newMarker)) {
        newMakersList.push(newMarker)
      }
    })
    this.allMarkers.next([...this.allMarkers.value, ...newMakersList])
  }

  currentMarkersInclude(newMarker: {lat: number, lng: number, control: string}): boolean {
    let currentMarkers = this.allMarkers.value
    let returnValue = false

    currentMarkers.forEach(marker => {
      if (marker.lat == newMarker.lat &&
          marker.lng == newMarker.lng &&
          marker.control == newMarker.control
      ) returnValue = true
    })
    return returnValue
  }
}
