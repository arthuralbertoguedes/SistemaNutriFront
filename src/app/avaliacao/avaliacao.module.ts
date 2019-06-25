import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvaliacaoComponent } from './avaliacao.component';
import { AnamneseComponent } from './anamnese/anamnese.component';
import { UtilitariosModule } from '../utilitarios/utilitarios.module';
import { AntropometriaComponent } from './antropometria/antropometria.component';

@NgModule({
  declarations: [
      AvaliacaoComponent,
      AnamneseComponent,
      AntropometriaComponent
  ],
  imports: [
    CommonModule,
    UtilitariosModule
  ],
  exports: [
      AvaliacaoComponent
  ],
  providers: [
      
  ]
  
})
export class AvaliacaoModule { }
