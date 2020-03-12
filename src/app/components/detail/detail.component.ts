import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void
  {
  }
}
