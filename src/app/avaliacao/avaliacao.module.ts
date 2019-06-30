import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvaliacaoComponent } from './avaliacao.component';
import { AnamneseComponent } from './anamnese/anamnese.component';
import { UtilitariosModule } from '../utilitarios/utilitarios.module';
import { AntropometriaComponent } from './antropometria/antropometria.component';
import { ComposicaoCorporalComponent } from './composicao-corporal/composicao-corporal.component';
import { AnamneseService } from './anamnese/anamnese.service';
import { AntropometriaService } from './antropometria/antropometria-service';
import { ComposicaoService } from './composicao-corporal/composicao-service';

@NgModule({
  declarations: [
      AvaliacaoComponent,
      AnamneseComponent,
      AntropometriaComponent,
      ComposicaoCorporalComponent
  ],
  imports: [
    CommonModule,
    UtilitariosModule
  ],
  exports: [
      AvaliacaoComponent
  ],
  providers: [
    AnamneseService,
    AntropometriaService,
    ComposicaoService
  ]
  
})
export class AvaliacaoModule { }
