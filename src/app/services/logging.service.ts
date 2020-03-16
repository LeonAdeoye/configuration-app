import { Injectable } from '@angular/core';
import { LogLevel } from "../models/types";
import { Constants } from "../models/constants";
import * as log4JavaScript from 'log4javascript';
import { UtilityService } from "./utility.service";
import { LocalDateTimestamp } from "../pipes/local-date-timestamp.pipe";

@Injectable({
  providedIn: 'root'
})
export class LoggingService
{
  private loggerMaxSize: number = Constants.MAX_LOG_SIZE;
  private loggerDefaultLevel: LogLevel = LogLevel.DEBUG;
  private loggerURL: string = "http://localhost:20002/logs";
  private logger: any;
  private loggerName: string;
  private userId: string = "leon.adeoye";

  constructor()
  {

  }

  public initialize(appName: string)
  {
    this.logger = log4JavaScript.getLogger(appName);
    let appender = new log4JavaScript.AjaxAppender(this.loggerURL);
    appender.addHeader('Content-Type', 'application/x-www-form-urlencoded');
    this.logger.addAppender(appender);
  }

  public log(source: string, message: string, logLevel: LogLevel): void
  {
    let localDateTimeStamp = new LocalDateTimestamp();
    let timestamp = new Number((UtilityService.getCurrentTimestamp()));
    let localTimestamp = localDateTimeStamp.transform(timestamp.valueOf());

    let currentLevel = LogLevel.DEBUG;
    if(!UtilityService.isNullOrUndefined(logLevel))
      currentLevel = (<any>LogLevel)[logLevel.toString().toUpperCase()];

    const messageToLog = `[${currentLevel}] - [${this.userId}] - [${source}] - [${localTimestamp}] - ${this.truncate(message)}`;

    switch(logLevel)
    {
      case LogLevel.DEBUG:
        this.logger.debug(messageToLog);
        break;
      case LogLevel.ERROR:
        this.logger.error(messageToLog);
        break;
      case LogLevel.INFO:
        this.logger.info(messageToLog);
        break;
      case LogLevel.TRACE:
        this.logger.trace(messageToLog);
        break;
      case LogLevel.WARN:
        this.logger.warn(messageToLog);
        break;
    }
    console.log(messageToLog);
  }

  private truncate(value: string): string
  {
    return (value.length > this.loggerMaxSize) ? (value.slice(0, this.loggerMaxSize) + "...[TRUNCATED]") : value;
  }

  public setLogMaxSize(maxLogSize: number): void
  {
    this.loggerMaxSize = maxLogSize;
  }

  public setLogLevel(logLevel: LogLevel)
  {
    this.loggerDefaultLevel = logLevel;
  }
}
