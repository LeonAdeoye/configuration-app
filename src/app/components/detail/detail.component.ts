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
  @Input() owner: string;
  @Input() key: string;
  @Input() value: string;
  @Input() configuration: Configuration;
  @Output() closePanelEventEmitter = new EventEmitter();

  constructor(private configurationService: ConfigurationService) { }

  ngOnInit(): void
  {
  }

  public clear(): void
  {
    this.configuration = null;
    this.owner = "";
    this.key = "";
    this.value = "";
  }

  public save(): void
  {
    if(this.configurationService.getConfigurationValue(this.owner, this.key))
      this.configurationService.editConfiguration(this.owner, this.key, this.value);
    else
      this.configurationService.addNewConfiguration(this.owner, this.key, this.value);

    this.closePanelEventEmitter.emit();
  }

  public cancel(): void
  {

    this.closePanelEventEmitter.emit();
  }
}
