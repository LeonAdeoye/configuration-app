import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainGridComponent } from './components/main-grid/main-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { LoggingService } from "./services/logging.service";
import { MessageService } from "./services/message.service";
import { ConfigurationService } from "./services/configuration.service";
import { BootstrapService } from "./services/bootstrap.service";
import { PopupService } from "./services/popup.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    MainGridComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    LoggingService,
    MessageService,
    ConfigurationService,
    BootstrapService,
    PopupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
