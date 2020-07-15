import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  locations: any;
  constructor( private locationService: LocationService ) {

    // Subscribe al servicio getLocacions
    this.locationService.getLocations()
      .subscribe( locations => {
        this.locations = locations;
      });

   }

  ngOnInit(): void {
  }

}
