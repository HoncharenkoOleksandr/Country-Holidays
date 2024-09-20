import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { PublicHolidayV3Dto } from '../../services/models';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  countryCode: string;
  holidays: PublicHolidayV3Dto[] = [];
  currentYear: number = new Date().getFullYear();
  years: number[] = [2024];

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService
  ) {
    this.countryCode = this.route.snapshot.paramMap.get('countryCode')!;
  }

  ngOnInit(): void {
    this.years = Array.from({ length: 11 }, (v, k) => 2020 + k);
    this.loadHolidays(this.currentYear);
  }

  loadHolidays(year: number): void {
    this.countryService
      .getPublicHolidays(year, this.countryCode)
      .subscribe((data: PublicHolidayV3Dto[]) => {
        console.log(data);
        this.holidays = data;
      });
  }

  onYearChange(year: number): void {
    this.loadHolidays(year);
  }
}
