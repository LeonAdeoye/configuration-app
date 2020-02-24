import { Component, OnInit } from '@angular/core';
import { LoggingService } from "../../services/logging.service";
import { ConfigurationService } from "../../services/configuration.service";
import { LogLevel } from "../../models/types";

@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.sass']
})
export class MainGridComponent implements OnInit
{
  columnDefs =
  [
    { field: 'owner', sortable: true},
    { field: 'key', sortable: true},
    { field: 'value', sortable: true}
  ];

  rowData =
  [
    { owner: 'horatio', key: 'surname', value: "Adeoye" },
    { owner: 'horatio', key: 'firstName', value: "Ethan" },
    { owner: 'horatio', key: 'age', value: 7 }
  ];

  constructor(private loggingService: LoggingService, private configurationService: ConfigurationService)
  {
    this.configurationService.loadAllConfigurations();
  }

  private log(message: string, logLevel: LogLevel)
  {
    this.loggingService.log("MainGridComponent", message, logLevel);
  }

  ngOnInit(): void
  {
  }
}
