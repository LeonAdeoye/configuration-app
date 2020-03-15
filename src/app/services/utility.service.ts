import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService
{
  constructor() { }

  public static isNullOrEmptyOrBlankOrUndefined(value: String): boolean
  {
    return !UtilityService.isNotNullOrEmptyOrBlankOrUndefined(value);
  }

  public static isNotNullOrEmptyOrBlankOrUndefined(value: String): boolean
  {
    return value && value.trim() !== "";
  }
}
