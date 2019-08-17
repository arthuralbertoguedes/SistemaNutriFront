import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteModule } from '../paciente/paciente.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PacienteModule
  ],
  exports: [
    PacienteModule
  ]
})
export class TelaInicialModule { }
