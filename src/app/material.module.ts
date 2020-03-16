import { NgModule } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";

@NgModule({
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  exports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule
  ]
})
export class MaterialModule {}
