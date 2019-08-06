import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricoMensagensComponent } from './historico-mensagens/historico-mensagens.component';
import { MensagemComponent } from './mensagem.component';
import { UtilitariosModule } from '../utilitarios/utilitarios.module';
import { MensagemService } from './mensagem.service';

@NgModule({
  declarations: [
    HistoricoMensagensComponent,
    MensagemComponent
  ],
  imports: [
    CommonModule,
    UtilitariosModule
  ],
  providers: [
    MensagemService
  ],
  exports: [
    HistoricoMensagensComponent
  ]
})
export class MensagemModule { }
