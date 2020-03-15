import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigurationService } from "../../services/configuration.service";
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
    if(this.configurationService.getConfigurationValue(this.configuration.owner, this.configuration.key))
      this.configurationService.editConfiguration(this.configuration.owner, this.configuration.key, this.configuration.value);
    else
      this.configurationService.addNewConfiguration(this.configuration.owner, this.configuration.key, this.configuration.value);

    this.closePanelEventEmitter.emit();
  }

  public cancel(): void
  {

    this.closePanelEventEmitter.emit();
  }
}
