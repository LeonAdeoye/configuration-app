import { NgModule } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTooltipModule
  ],
  exports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTooltipModule
  ]
})
export class MaterialModule {}
