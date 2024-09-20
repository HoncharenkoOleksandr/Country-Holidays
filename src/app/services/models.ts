export interface CountryInfoDto {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[];
}

export interface CountryV3Dto {
  countryCode: string;
  name: string;
}

export interface PublicHolidayV3Dto {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties?: string[];
  launchYear?: number;
  types?: HolidayTypes[];
}

export interface LongWeekendV3Dto {
  startDate: string;
  endDate: string;
  dayCount: number;
  needBridgeDay: boolean;
}

export enum HolidayTypes {
  Public = 'Public',
  Bank = 'Bank',
  School = 'School',
  Authorities = 'Authorities',
  Optional = 'Optional',
  Observance = 'Observance',
}
