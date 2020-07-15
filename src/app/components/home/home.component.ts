import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  forma: FormGroup;
  locations: any;
  success = false;
  error = false;

  constructor(  private locationService: LocationService,
                private fb: FormBuilder,
                private validators: ValidatorsService,
                private router: Router ) {

    this.crearFormulario();
  }

  ngOnInit(): void {
    // Subscribe al servicio getLocacions
    this.locationService.getLocations()
      .subscribe( locations => {
        this.locations = locations;
        // Agrega un nuevo elemento al inicio del objeto
        this.locations.unshift({
          id_location: '',
          name_location: 'Select Parent',
          area_location: 0,
          id_parent: null
        });
      });
  }

  get idInvalid(){
    return this.forma.get('id_location').invalid && this.forma.get('id_location').touched;
  }
  get nameInvalid(){
    return this.forma.get('name_location').invalid && this.forma.get('name_location').touched;
  }
  get areaInvalid(){
    return this.forma.get('area_location').invalid && this.forma.get('area_location').touched;
  }

  guardar( ){
    if( this.forma.invalid ){
      return Object.values( this.forma.controls ).forEach( control => {
        control.markAsTouched();
      });
    }else{
      const location = {
          id: this.forma.controls.id_location.value,
          name: this.forma.controls.name_location.value,
          area: this.forma.controls.area_location.value,
          id_parent: (this.forma.controls.id_parent.value === '') ? null : parseInt( this.forma.controls.id_parent.value, 10)
      };

      this.locationService.setLocations(location)
      .subscribe( response => {
        console.log(response);
        if( response[0].status === 200 ){
          this.success = true;
          this.forma.reset({
            id_location: '',
            name_location: '',
            area_location: '',
            id_parent: ''
          });
        }else{
          this.error = true;
        }
      });

    }
  }

  crearFormulario(){
    this.success = false;
    this.error = false;
    this.forma = this.fb.group({
      id_location: ['', Validators.required ],
      name_location: ['', [Validators.required, Validators.minLength(3)] ],
      area_location: ['', Validators.required ],
      id_parent: ['']
    });
  }

  goSearch(){
    this.router.navigate( ['/search'] );
  }
}
