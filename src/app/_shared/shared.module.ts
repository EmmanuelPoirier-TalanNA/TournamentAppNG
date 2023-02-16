import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
