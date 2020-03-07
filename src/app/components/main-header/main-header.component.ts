import { Component, OnInit } from '@angular/core';
import { GridSearchService } from "../../services/grid-search.service";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.sass']
})
export class MainHeaderComponent implements OnInit
{
  public gridSearchTextValue: string;
  constructor(private gridSearchService: GridSearchService) {}

  ngOnInit(): void
  {
  }

  changeGridSearchTextValue(event): void
  {
    if(event.keyCode === 27)
      this.gridSearchTextValue = "";
    else
      this.gridSearchTextValue = event.target.value;

    this.gridSearchService.setText(this.gridSearchTextValue);
  }
}
