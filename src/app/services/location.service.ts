import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private URL: string;
  constructor( private http: HttpClient ) {
    this.URL = '/rest/';
  }

  getLocations(){
    return this.http.get( this.URL + 'locations' );
  }

  setLocations( location ){
    /*this.http.post( this.URL + 'setlocation', location ).toPromise().then(data => {
      return data;
    });*/

    return this.http.post( this.URL + 'setlocation', location ).pipe( map(response => response) );
  }

  getAllLocations(){
    return this.http.get( this.URL + 'locations' ).pipe( map(response => response) );
  }

}
