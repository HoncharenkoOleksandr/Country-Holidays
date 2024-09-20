import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { CountryV3Dto } from '../../services/models';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  countries: CountryV3Dto[] = [];
  filteredCountries: CountryV3Dto[] = [];
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService
      .getAvailableCountries()
      .subscribe((data: CountryV3Dto[]) => {
        console.log(data);
        this.countries = data;
        this.filteredCountries = this.countries;
      });

    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged() 
      )
      .subscribe(searchTerm => {
        this.filteredCountries = this.countries.filter(country =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
  }

  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }
}
