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
import {AutoCompleteModule} from 'primeng/autocomplete';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TableModule} from 'primeng/table';
import { MessageService } from '../../../node_modules/primeng/api';
import { PlanoAlimentarModule } from '../plano-alimentar/plano-alimentar.module';

@NgModule({
  declarations: [
      AvaliacaoComponent,
      AnamneseComponent,
      AntropometriaComponent,
      ComposicaoCorporalComponent
     
  ],
  imports: [
    CommonModule,
    UtilitariosModule,
    TabMenuModule,
    AutoCompleteModule,
    SelectButtonModule,
    TableModule,
    PlanoAlimentarModule
  ],
  exports: [
      AvaliacaoComponent,
      AnamneseComponent,
      AntropometriaComponent,
      ComposicaoCorporalComponent
      
  ],
  providers: [
    AnamneseService,
    AntropometriaService,
    ComposicaoService,
    MessageService
  ]
  
})
export class AvaliacaoModule { }
