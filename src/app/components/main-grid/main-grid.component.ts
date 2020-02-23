import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void
  {
  }
}
