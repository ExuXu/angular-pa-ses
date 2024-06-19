import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { ValidRegion } from 'src/app/countries/interfaces/region.type';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})

export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @ViewChild('txtInput')
  public txtInput!: ElementRef<HTMLInputElement>

  @Input()
  placeholder: string = '';

  @Output()
  emittedValue = new EventEmitter<string>();

  @Input()
  initialTerm: string | ValidRegion = '';

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe( value => {
        this.emittedValue.emit(value);

      })
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();

  }

  searchTag( value: string ) : void {
    if (value.length === 0) return;
    this.emittedValue.emit(value);
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );

  }


}
