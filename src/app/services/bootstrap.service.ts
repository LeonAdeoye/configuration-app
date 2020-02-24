import { Injectable } from '@angular/core';
import { LogLevel } from "../models/types";
import { LoggingService } from "./logging.service";

@Injectable({
  providedIn: 'root'
})

export class BootstrapService
{
  constructor(private loggingService: LoggingService)
  {

  }

  private log(message: string, logLevel: LogLevel)
  {
    this.loggingService.log("BootstrapService", message, logLevel);
  }
}
