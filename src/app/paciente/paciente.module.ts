import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteComponent } from './paciente.component';
import {FieldsetModule} from 'primeng/fieldset';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [PacienteComponent],
  imports: [
    CommonModule,
    FieldsetModule,
    BrowserAnimationsModule
  ],
  exports: [
    PacienteComponent
  ]
})
export class PacienteModule { }
