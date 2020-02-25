import { Component, OnInit } from '@angular/core';
import { LoggingService } from "../../services/logging.service";
import { ConfigurationService } from "../../services/configuration.service";
import { LogLevel, ServiceUpdate } from "../../models/types";
import { GridOptions } from "ag-grid-community";

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

  private gridOptions: GridOptions;

  constructor(private loggingService: LoggingService, private configurationService: ConfigurationService)
  {
    this.gridOptions = <GridOptions> {};
    this.gridOptions.columnDefs = this.getColumnsDefinitions();
    this.gridOptions.getContextMenuItems = (params) => this.getContextMenuItems(params);
    this.configurationService.loadAllConfigurations();

    configurationService.serviceUpdate.subscribe((serviceUpdate: ServiceUpdate) =>
    {
      if(serviceUpdate  === ServiceUpdate.REFRESH)
      {
        this.refreshGrid();
      }
    })
  }

  private log(message: string, logLevel: LogLevel)
  {
    this.loggingService.log("MainGridComponent", message, logLevel);
  }

  private getContextMenuItems(params): any[]
  {
    return [
      {
        name: "Edit",
        disabled: true,
        action: () => {}
      },
      "separator",
      {
        name: "Delete",
        disabled: true,
        action: () => {}
      }
    ];
  }

  private getColumnsDefinitions(): any[]
  {
    return [
      {
        field: 'owner',
        sortable: true,
        minWidth: 150
      },
      {
        field: 'key',
        sortable: true,
        minWidth: 150
      },
      {
        field: 'value',
        sortable: true,
        monWidth: 300
      }
    ];
  }

  private refreshGrid()
  {
    let itemsToUpdate = [];
    let itemsToRemove = [];
    let itemsToAdd = [];

  }

  ngOnInit(): void
  {
  }
}
