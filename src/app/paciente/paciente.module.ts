import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteComponent } from './paciente.component';
import {FieldsetModule} from 'primeng/fieldset';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NovoPacienteComponent } from './novo-paciente/novo-paciente.component';
import { RouterModule } from '../../../node_modules/@angular/router';
import { AuthguardService } from '../guards/authguard.service';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '../../../node_modules/@angular/forms';
import { PacienteService } from './paciente.service';
import { DataViewModule } from '../../../node_modules/primeng/dataview';
import { PacienteDetalhadoComponent } from './paciente-detalhado/paciente-detalhado.component';
import { AvaliacaoModule } from '../avaliacao/avaliacao.module';
import { DadosPessoaisModule } from '../dados-pessoais/dados-pessoais.module';
import { ConsultaModule } from '../consulta/consulta.module';
import { MensagemModule } from '../mensagem/mensagem.module';
import { PlanoAlimentarModule } from '../plano-alimentar/plano-alimentar.module';
import { UtilitariosModule } from '../utilitarios/utilitarios.module';
import {FileUploadModule} from 'primeng/fileupload';
import { MessageService } from '../../../node_modules/primeng/api';

@NgModule({
  declarations: [PacienteComponent, 
                 NovoPacienteComponent, 
                 PacienteDetalhadoComponent
          ],
          
  imports: [
    CommonModule,
    FieldsetModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    DataViewModule,
    AvaliacaoModule,
    DadosPessoaisModule,
    ConsultaModule,
    MensagemModule,
    PlanoAlimentarModule,
    FormsModule,
    UtilitariosModule,
    FileUploadModule
  ],
  exports: [
    PacienteComponent
  ],
  providers: [AuthguardService,
              FormBuilder,
              PacienteService,
              MessageService  ]
})
export class PacienteModule { }
