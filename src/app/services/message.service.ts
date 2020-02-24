import { Injectable } from '@angular/core';
import { LogLevel, MessageTransport } from "../models/types";
import { LoggingService } from "./logging.service";
import { Message } from "../models/message";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Configuration } from "../models/configuration";


@Injectable({
  providedIn: 'root'
})
export class MessageService
{
  constructor(private loggingService: LoggingService, private httpClient: HttpClient)
  {
  }

  private log(message: string, logLevel: LogLevel)
  {
    this.loggingService.log("MessageService", message, logLevel);
  }

  // TODO: do I need a factory class here?
  public send(message: Message) : any
  {
    switch(message.getTransport())
    {
      case MessageTransport.HTTP:
        return this.httpClient.request<any>(message.getMethod(), message.getAddress(), { responseType: "json" });
      case MessageTransport.HTTPS:
        break;
      case MessageTransport.WEB_SOCKET:
        break;
    }

    return "";
  }
}
