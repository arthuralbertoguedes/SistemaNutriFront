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
import {TabMenuModule} from 'primeng/tabmenu';
import { PlanoAlimentarComponent } from './plano-alimentar/plano-alimentar.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { PlanoAlimentarService } from './plano-alimentar/plano-alimentar.service';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
      AvaliacaoComponent,
      AnamneseComponent,
      AntropometriaComponent,
      ComposicaoCorporalComponent,
      PlanoAlimentarComponent
     
  ],
  imports: [
    CommonModule,
    UtilitariosModule,
    TabMenuModule,
    AutoCompleteModule,
    SelectButtonModule,
    TableModule
  ],
  exports: [
      AvaliacaoComponent
  ],
  providers: [
    AnamneseService,
    AntropometriaService,
    PlanoAlimentarService,
    ComposicaoService
  ]
  
})
export class AvaliacaoModule { }
