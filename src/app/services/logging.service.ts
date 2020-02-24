import { Injectable } from '@angular/core';
import {LogLevel} from "../models/types";

@Injectable({
  providedIn: 'root'
})
export class LoggingService
{
  constructor()
  {

  }

  public log(source: string, message: string, logLevel: LogLevel): void
  {
    console.log(`${source}-${logLevel}:${message}`);
  }
}
