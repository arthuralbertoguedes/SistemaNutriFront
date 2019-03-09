import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteComponent } from './paciente.component';
import {FieldsetModule} from 'primeng/fieldset';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NovoPacienteComponent } from './novo-paciente/novo-paciente.component';
import { RouterModule } from '../../../node_modules/@angular/router';
import { AuthguardService } from '../guards/authguard.service';
@NgModule({
  declarations: [PacienteComponent, NovoPacienteComponent],
  imports: [
    CommonModule,
    FieldsetModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  exports: [
    PacienteComponent
  ],
  providers: [AuthguardService]
})
export class PacienteModule { }
