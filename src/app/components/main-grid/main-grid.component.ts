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
  public configurationsGridOptions: GridOptions;

  constructor(private loggingService: LoggingService, private configurationService: ConfigurationService)
  {
    // TODO move this call to bootstrap service.
    this.configurationService.loadAllConfigurations();

    this.configurationsGridOptions = <GridOptions> {};
    this.configurationsGridOptions.columnDefs = this.getColumnsDefinitions();
    this.configurationsGridOptions.getContextMenuItems = (params) => this.getContextMenuItems(params);
    this.configurationsGridOptions.getRowNodeId = (row) =>
    {
      return row.getId;
    }

    configurationService.serviceUpdate.subscribe((serviceUpdate: ServiceUpdate) =>
    {
      if(serviceUpdate  === ServiceUpdate.REFRESH && this.configurationsGridOptions.api)
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
        minWidth: 300
      }
    ];
  }

  private refreshGrid()
  {
    let itemsToUpdate = [];
    let itemsToRemove = [];
    let itemsToAdd = [];

    let configurations = this.configurationService.getAllConfigurations();
    for(let index = 0; index < configurations.length; ++index)
    {
      let configuration = configurations[index];
      let configurationUpdateRowNode = this.configurationsGridOptions.api.getRowNode(configuration.getId());

      if(configurationUpdateRowNode)
        itemsToUpdate.push(configuration);
      else
        itemsToAdd.push(configuration);
    }

    this.configurationsGridOptions.api.forEachNode((currentRow) =>
    {
      let foundMatchingRow = false;
      for(let index = 0; index < configurations.length; ++index)
      {
        if(currentRow.data.id === configurations[index].getId())
        {
          foundMatchingRow = true;
          break;
        }
      }

      if(!foundMatchingRow)
        itemsToRemove.push(currentRow.data)
    });

    this.configurationsGridOptions.api.updateRowData({remove: itemsToRemove});
    this.configurationsGridOptions.api.updateRowData({update: itemsToUpdate});

    for(let index = 0; index < itemsToAdd.length; ++index)
      this.configurationsGridOptions.api.updateRowData({add: [itemsToAdd[index]], addIndex: index});
  }

  public onGridReady(event): void
  {

  }

  ngOnInit(): void
  {
  }
}
