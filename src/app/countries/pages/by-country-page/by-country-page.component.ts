import { Component } from '@angular/core';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  public searchApiTerm: string = 'name';
  public placeholderValue: string = 'País';
}
