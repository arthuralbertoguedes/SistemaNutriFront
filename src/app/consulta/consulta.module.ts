import { NgModule } from '@angular/core';
import { ConsultaComponent } from './consulta.component';
import { NovaConsultaComponent } from './nova-consulta/nova-consulta.component';
import { ConsultaService } from './consulta.service';
import { UtilitariosModule } from '../utilitarios/utilitarios.module';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { PacienteService } from '../paciente/paciente.service';

@NgModule({
  declarations: [
                ConsultaComponent,
                NovaConsultaComponent],
  imports: [
            UtilitariosModule
  ],
  exports: [
            ConsultaComponent,
            NovaConsultaComponent
  ],
  providers: [
              ConsultaService,
              PacienteService
  ]
})
export class ConsultaModule { }
