import { Component, Input, OnInit } from '@angular/core';
import { ConfigurationService } from "../../services/configuration.service";

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

  constructor(private configurationService: ConfigurationService) { }

  ngOnInit(): void
  {
  }

  public clear(): void
  {
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

    // Emit a message to close window.
  }

  public cancel(): void
  {
    // Emit a message to close window.
  }
}
