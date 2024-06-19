import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';

const COUNTY_API_URL = 'https://restcountries.com/v3.1'

@Injectable({providedIn: 'root'})
export class CountriesService {
  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if ( !localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  }

  private getCountriesReques( url: string ): Observable<Country[]> {
    return this.httpClient.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) ),
      );
  }

  searchCountry( term: string, apiTerm: string): Observable<Country[]> {

    const url = `${COUNTY_API_URL}/${apiTerm}/${term}`;
    return this.getCountriesReques( url )
      .pipe(
        tap( countries => {

          if (apiTerm === 'capital') this.cacheStore.byCapital = { term, countries };
          if (apiTerm === 'region') this.cacheStore.byRegion = { region: term, countries };
          if (apiTerm === 'name') this.cacheStore.byCountries = { term, countries };
        }),
        tap( () => this.saveToLocalStorage() )
      )

  }

  searchById( code: string ): Observable<Country | null> {

    const url = `${COUNTY_API_URL}/alpha/${code}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError( error =>
          of(null)
        )
      )

  }



}
