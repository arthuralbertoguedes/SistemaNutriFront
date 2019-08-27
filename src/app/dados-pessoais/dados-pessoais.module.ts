import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformacoesPessoaisPacienteComponent } from './informacoes-pessoais-paciente/informacoes-pessoais-paciente.component';
import { UtilitariosModule } from '../utilitarios/utilitarios.module';
import { MessageService } from '../../../node_modules/primeng/api';
import { PacienteService } from '../paciente/paciente.service';

@NgModule({
  declarations: [
      InformacoesPessoaisPacienteComponent
  ],
  imports: [
      CommonModule,
      UtilitariosModule
  ],
  exports:[
      InformacoesPessoaisPacienteComponent
  ],
  providers: [
      MessageService,
      PacienteService
  ]
})
export class DadosPessoaisModule { }
