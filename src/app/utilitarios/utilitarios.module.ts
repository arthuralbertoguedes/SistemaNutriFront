import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '../../../node_modules/@angular/platform-browser/animations';
import { FieldsetModule } from '../../../node_modules/primeng/fieldset';
import { RouterModule } from '../../../node_modules/@angular/router';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '../../../node_modules/@angular/forms';
import { DataViewModule } from '../../../node_modules/primeng/dataview';
import {CalendarModule} from 'primeng/calendar';
import {AutoCompleteModule} from 'primeng/autocomplete';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FieldsetModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    DataViewModule,
    FormsModule,
    CalendarModule,
    AutoCompleteModule
  ],

  exports: [
    CommonModule,
    FieldsetModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    DataViewModule,
    FormsModule,
    CalendarModule,
    AutoCompleteModule
  ]
          ,
  providers: [
    FormBuilder
  ]
})
export class UtilitariosModule { }
