import { Component, OnInit } from '@angular/core';
import { LoggingService } from "../../services/logging.service";
import { ConfigurationService } from "../../services/configuration.service";
import { LogLevel, ServiceUpdate } from "../../models/types";
import { GridOptions } from "ag-grid-community";
import { GridSearchService } from "../../services/grid-search.service";
import { IpcRenderer } from 'electron'
import { Configuration } from "../../models/configuration";
import { LocalDateTimestamp } from "../../pipes/local-date-timestamp.pipe";

@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.sass']
})
export class MainGridComponent implements OnInit
{
  public configurationsGridOptions: GridOptions;
  private ipcRenderer: IpcRenderer;

  constructor(private loggingService: LoggingService, private configurationService: ConfigurationService, private gridSearchService: GridSearchService)
  {
    this.configurationsGridOptions = <GridOptions> {};
    this.configurationsGridOptions.columnDefs = this.getColumnsDefinitions();
    this.configurationsGridOptions.getContextMenuItems = (params) => this.getDefaultContextMenuItems(params);
    this.configurationsGridOptions.getRowNodeId = (row) =>
    {
      return row.id;
    };

    this.configurationsGridOptions.suppressCellSelection = true;

    this.configurationsGridOptions.onCellContextMenu = (params) =>
    {
      this.configurationsGridOptions.api.deselectAll();
      params.node.setSelected(true);
    };

    configurationService.serviceUpdateSubject.subscribe((serviceUpdate: ServiceUpdate) =>
    {
      if(serviceUpdate  === ServiceUpdate.REFRESH && this.configurationsGridOptions.api)
      {
        this.refreshGrid();
      }
    });

    this.gridSearchService.gridSearchTextSubject.subscribe((gridSearchTextValue) =>
    {
      if(this.configurationsGridOptions.api)
        this.configurationsGridOptions.api.setQuickFilter(gridSearchTextValue);
    });

    if ((<any>window).require)
    {
      try
      {
        this.ipcRenderer = (<any>window).require('electron').ipcRenderer;
        this.log("Successfully created IPC renderer in Main Grid component. Component is now ready to receive context menu commands.", LogLevel.DEBUG);

        this.ipcRenderer.on('context-menu-command', (event, arg) =>
        {
          this.log('Main Grid component received context-menu-command: ' + arg, LogLevel.DEBUG);
          let selectedConfiguration: Configuration;

          switch(arg)
          {
            case "Edit Configuration":
              selectedConfiguration = this.getSelectedConfiguration();
              if(selectedConfiguration)
                this.configurationService.editConfigurationSubject.next(selectedConfiguration);
              break;
            case "Clone Configuration":
              selectedConfiguration = this.getSelectedConfiguration();
              if(selectedConfiguration)
                this.configurationService.cloneConfigurationSubject.next(selectedConfiguration);
              break;
            case "Delete Configuration":
              selectedConfiguration = this.getSelectedConfiguration();
              if(selectedConfiguration)
                this.configurationService.deleteConfiguration(selectedConfiguration.id);
              break;
            case "Refresh Configurations":
              this.configurationService.loadAllConfigurations();
              break;
          }
        })
      }
      catch (e)
      {
        throw e;
      }
    }
    else
      this.log("Unable to create IPC renderer in App component.", LogLevel.DEBUG);
  }

  private log(message: string, logLevel: LogLevel)
  {
    this.loggingService.log("MainGridComponent", message, logLevel);
  }

  private getSelectedConfiguration() : Configuration
  {
    if(this.configurationsGridOptions.api && this.configurationsGridOptions.api.getSelectedRows().length > 0)
      return this.configurationsGridOptions.api.getSelectedRows()[0] as Configuration;

    return null;
  }

  // This feature is not supported in the community version of ag-grid and has not been tested.
  public getDefaultContextMenuItems(params): any[]
  {
    return [
      {
        name: "Edit",
        disabled: true,
        action: () =>
        {
          this.editConfiguration(params);
        }
      },
      "separator",
      {
        name: "Delete",
        disabled: true,
        action: () =>
        {
          this.deleteConfiguration(params);
        }
      }
    ];
  }

  private getColumnsDefinitions(): any[]
  {
    return [
      {
        field: 'owner',
        sortable: true,
        minWidth: 130
      },
      {
        field: 'key',
        sortable: true,
        minWidth: 220
      },
      {
        field: 'value',
        sortable: true,
        minWidth: 470
      },
      {
        field: 'lastUpdatedBy',
        sortable: true,
        minWidth: 140,
        maxWidth: 140
      },
      {
        headerName: "Last Updated On",
        field: 'lastUpdatedOn',
        sortable: true,
        minWidth: 150,
        maxWidth: 150,
        valueGetter: (params) =>
        {
          let localDateTimeStamp = new LocalDateTimestamp();
          let timestamp = new Number((params.data as Configuration).lastUpdatedOn);
          return localDateTimeStamp.transform(timestamp.valueOf());
        }
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
      let configurationUpdateRowNode = this.configurationsGridOptions.api.getRowNode(configuration.id);

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
        if(currentRow.data.id === configurations[index].id)
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

  public editConfiguration(params: any): void
  {

  }

  public deleteConfiguration(params: any): void
  {

  }
}
