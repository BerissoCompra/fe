import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-input',
  templateUrl: './map-input.component.html',
  styleUrls: ['./map-input.component.scss']
})
export class MapInputComponent extends FieldType implements OnInit {

  apiLoaded: Observable<any>;
  optionsMap: google.maps.MapOptions = {
    center: {lat: -34.8677284428677, lng: -57.8852099070261},
    zoom: 12
  };

  center: google.maps.LatLngLiteral = {lat: -34.8677284428677, lng: -57.8852099070261};
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {draggable: true};
  markerPositions: google.maps.LatLngLiteral[] = [];


  constructor(private httpClient: HttpClient) {
    super();
    this.apiLoaded = this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleKey}`, 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  ngOnInit(): void {
    if(this.formControl.value.latitude && this.formControl.value.longitude){
      this.optionsMap = {
        center:{
          lat: this.formControl.value.latitude, lng: this.formControl.value.longitude
        },
        zoom: 15
      }
      this.markerPositions.push({
        lat: this.formControl.value.latitude,
        lng: this.formControl.value.longitude,
      })
    }
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if(this.markerPositions.length > 0){
      this.markerPositions = [];
    };
    this.markerPositions.push(event.latLng.toJSON());
    if(!this.to.change) return;
    this.to.change(this.field, {
      latitude: this.markerPositions[0].lat,
      longitude: this.markerPositions[0].lng,
    })
  }

}
