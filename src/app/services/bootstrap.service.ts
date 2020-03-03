import { Injectable } from '@angular/core';
import { LogLevel } from "../models/types";
import { LoggingService } from "./logging.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class BootstrapService
{
  public static bootstrapSubject = new Subject<String>();

  constructor(private loggingService: LoggingService)
  {
  }

  private log(message: string, logLevel: LogLevel)
  {
    this.loggingService.log("BootstrapService", message, logLevel);
  }
}
