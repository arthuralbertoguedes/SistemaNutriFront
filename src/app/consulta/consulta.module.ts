import { NgModule } from '@angular/core';
import { ConsultaComponent } from './consulta.component';
import { NovaConsultaComponent } from './nova-consulta/nova-consulta.component';
import { ConsultaService } from './consulta.service';
import { UtilitariosModule } from '../utilitarios/utilitarios.module';
import { PacienteService } from '../paciente/paciente.service';
import { HistoricoConsultaComponent } from './historico-consulta/historico-consulta.component';
import { MessageService } from '../../../node_modules/primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@NgModule({
  declarations: [
                ConsultaComponent,
                NovaConsultaComponent,
                HistoricoConsultaComponent],
  imports: [
            UtilitariosModule,
            ConfirmDialogModule
  ],
  exports: [
            ConsultaComponent,
            NovaConsultaComponent,
            HistoricoConsultaComponent
  ],
  providers: [
              ConsultaService,
              PacienteService,
              MessageService,
              ConfirmationService
  ]
})
export class ConsultaModule { }
