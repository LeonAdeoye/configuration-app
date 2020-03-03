import { Component } from '@angular/core';
import { BootstrapService } from "./services/bootstrap.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent
{
  title = 'configuration-app';

  public constructor(private bootStrapService: BootstrapService)
  {
  }
}
