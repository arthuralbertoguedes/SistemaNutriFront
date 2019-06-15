import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { PacienteComponent } from './paciente/paciente.component';
import { NovoPacienteComponent } from './paciente/novo-paciente/novo-paciente.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanActivate } from '../../node_modules/@angular/router/src/utils/preactivation';
import { AuthguardService } from './guards/authguard.service';
import { ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { ConsultaComponent } from './consulta/consulta.component';
import { NovaConsultaComponent } from './consulta/nova-consulta/nova-consulta.component';

export const routes : Routes = [
  {path: 'login', component: TelaLoginComponent},
  {path: 'home', component: TelaInicialComponent, children: [
      {path: 'paciente', component: PacienteComponent,  },
      {path: 'novo-paciente', component: NovoPacienteComponent },
      {path: 'consulta', component: ConsultaComponent},
      {path: 'nova-consulta', component: NovaConsultaComponent}
  ]
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
],
  exports: [RouterModule]
})
export class AppRoutingModule { }

    


