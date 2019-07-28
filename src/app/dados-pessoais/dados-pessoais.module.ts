import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformacoesPessoaisPacienteComponent } from './informacoes-pessoais-paciente/informacoes-pessoais-paciente.component';

@NgModule({
  declarations: [
      InformacoesPessoaisPacienteComponent
  ],
  imports: [
      CommonModule
  ],
  exports:[
      InformacoesPessoaisPacienteComponent
  ]
})
export class DadosPessoaisModule { }
