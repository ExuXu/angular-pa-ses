import { Component } from '@angular/core';
import { ValidRegion } from '../../interfaces/region.type';



@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public searchApiTerm: string = 'region';
  public placeholderValue: string = 'Region';

  public regions: ValidRegion[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];


}
