import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CountryInfoDto,
  CountryV3Dto,
  PublicHolidayV3Dto,
  LongWeekendV3Dto,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = ''; //TODO: .env file in to working yet!

  constructor(private http: HttpClient) {}

  // Get all available countries
  getAvailableCountries(): Observable<CountryV3Dto[]> {
    return this.http.get<CountryV3Dto[]>(`${this.baseUrl}/AvailableCountries`);
  }

  // Get detailed country info
  getCountryInfo(countryCode: string): Observable<CountryInfoDto> {
    return this.http.get<CountryInfoDto>(
      `${this.baseUrl}/CountryInfo/${countryCode}`
    );
  }

  // Get public holidays for a country and year
  getPublicHolidays(
    year: number,
    countryCode: string
  ): Observable<PublicHolidayV3Dto[]> {
    return this.http.get<PublicHolidayV3Dto[]>(
      `${this.baseUrl}/PublicHolidays/${year}/${countryCode}`
    );
  }

  // Get long weekends for a country and year
  getLongWeekends(
    year: number,
    countryCode: string
  ): Observable<LongWeekendV3Dto[]> {
    return this.http.get<LongWeekendV3Dto[]>(
      `${this.baseUrl}/LongWeekend/${year}/${countryCode}`
    );
  }

  // Check if today is a public holiday
  isTodayPublicHoliday(countryCode: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}/IsTodayPublicHoliday/${countryCode}`
    );
  }

  // Get next public holidays for a specific country
  getNextPublicHolidays(countryCode: string): Observable<PublicHolidayV3Dto[]> {
    return this.http.get<PublicHolidayV3Dto[]>(
      `${this.baseUrl}/NextPublicHolidays/${countryCode}`
    );
  }

  // Get upcoming public holidays worldwide for the next 7 days
  getNextPublicHolidaysWorldwide(): Observable<PublicHolidayV3Dto[]> {
    return this.http.get<PublicHolidayV3Dto[]>(
      `${this.baseUrl}/NextPublicHolidaysWorldwide`
    );
  }
}
