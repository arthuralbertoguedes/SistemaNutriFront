import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricoMensagensComponent } from './historico-mensagens/historico-mensagens.component';

@NgModule({
  declarations: [
    HistoricoMensagensComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HistoricoMensagensComponent
  ]
})
export class MensagemModule { }
