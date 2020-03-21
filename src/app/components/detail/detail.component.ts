import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigurationService } from "../../services/configuration.service";
import { UtilityService } from "../../services/utility.service";
import { Configuration } from "../../models/configuration";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit
{
  @Input() configuration: Configuration;
  @Output() closePanelEventEmitter = new EventEmitter();

  constructor(private configurationService: ConfigurationService)
  {
    this.clear();
  }

  ngOnInit(): void
  {
  }

  public clear(): void
  {
    this.configuration = new Configuration();
  }

  public save(): void
  {
    this.configurationService.saveConfiguration(this.configuration);
    this.closePanelEventEmitter.emit();
  }

  public cancel(): void
  {

    this.closePanelEventEmitter.emit();
  }

  public canClear(): boolean
  {
    return UtilityService.isNotNullOrEmptyOrBlankOrUndefined(this.configuration.owner)
      || UtilityService.isNotNullOrEmptyOrBlankOrUndefined(this.configuration.key)
      || UtilityService.isNotNullOrEmptyOrBlankOrUndefined(this.configuration.value);
  }

  public canSave(): boolean
  {
    return UtilityService.isNotNullOrEmptyOrBlankOrUndefined(this.configuration.owner)
      && UtilityService.isNotNullOrEmptyOrBlankOrUndefined(this.configuration.key)
      && UtilityService.isNotNullOrEmptyOrBlankOrUndefined(this.configuration.value);
  }
}
