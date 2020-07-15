import { Injectable } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';
import { LocationService } from './location.service';
import { Observable } from 'rxjs';

interface ErrorValidate{
  [s:string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  locations: any;
  constructor( private locationService: LocationService ) {

  }

  async cargarLocations(){
    // Subscribe al servicio getLocacions
    await this.locationService.getAllLocations()
      .toPromise().then( locations => {
        console.log(locations);
        this.locations = locations;
        console.log(this.locations);
      });
  }

  existId( control: FormControl ): ErrorValidate {
    // console.log(control);
    if ( !( control.value === '' || control.value === null) ){
      console.log(this.locations);
      for ( let loc of this.locations ) {
        if ( loc.id_location === control.value.toString() ){
          return{
            existId: true
          }
        }
      }
    }
    return null;
  }

  existName( control: FormControl ): ErrorValidate {

    if ( !( control.value === '' || control.value === null) ){
      for ( let loc of this.locations ) {
        if ( loc.name_location.toLowerCase() === control.value.toLowerCase() ){
          return{
            existName: true
          }
        }
      }
    }
    return null;
  }

  /*existIdTest( control: FormControl ): Promise<ErrorValidate> | Observable<ErrorValidate> {
    return new Promise( (resolve, reject ) => {

      const locations = this.locationService.getAllLocations()
      .toPromise().then( locations => {
        console.log(locations);
        if ( !( control.value === '' || control.value === null) ){
          for ( let loc of locations ) {
            if ( loc.id_location === control.value.toString() ){
              resolve({ existIdd: true });
            }
          }
        }
        console.log(this.locations);
      });

      resolve( null );

    });
  }*/

}
