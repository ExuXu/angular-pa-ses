import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { ValidRegion } from '../../interfaces/region.type';

@Component({
  selector: 'country-search-and-table',
  templateUrl: './search-and-table.component.html',
  styles: [
  ]
})
export class SearchAndTableComponent implements OnInit {

  constructor(private countryService: CountriesService)  {

  }

  @Input()
  public searchApiTerm: string = '';

  @Input()
  public placeholderValue: string = '';

  @Input()
  public regions?: string[];

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public selectedRegion?: ValidRegion | string;
  public initialTerm?: string ;

  ngOnInit(): void {
    this.countries =  this.searchApiTerm === 'capital' ? this.countryService.cacheStore.byCapital.countries:
                      this.searchApiTerm === 'name' ? this.countryService.cacheStore.byCountries.countries:
                      this.searchApiTerm === 'region' ? this.countryService.cacheStore.byRegion.countries: [] as Country[];

    this.initialTerm =  this.searchApiTerm === 'capital' ? this.countryService.cacheStore.byCapital.term:
                      this.searchApiTerm === 'name' ? this.countryService.cacheStore.byCountries.term:
                      this.searchApiTerm === 'region' ? this.countryService.cacheStore.byRegion.region: '';

    if (this.searchApiTerm === 'region') this.selectedRegion = this.countryService.cacheStore.byRegion.region;
  }

  searchByCapital( term: string ) : void {

    this.isLoading = true;

    this.selectedRegion = term;

    this.countryService.searchCountry( term, this.searchApiTerm )
      .subscribe( countries => {
        console.log(countries);
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
