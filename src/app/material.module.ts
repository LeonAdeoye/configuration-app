import { NgModule } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  imports: [
    MatIconModule,
    MatInputModule
  ],
  exports: [
    MatIconModule,
    MatInputModule
  ]
})
export class MaterialModule {}
