import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { PacienteComponent } from './paciente/paciente.component';
import { NovoPacienteComponent } from './paciente/novo-paciente/novo-paciente.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { NovaConsultaComponent } from './consulta/nova-consulta/nova-consulta.component';
import { PacienteDetalhadoComponent } from './paciente/paciente-detalhado/paciente-detalhado.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { LembretesComponent } from './lembretes/lembretes.component';
import { NovoLembreteComponent } from './lembretes/novo-lembrete/novo-lembrete.component';
import { MensagemComponent } from './mensagem/mensagem.component';
import { AuthGuardService } from './guards/auth-guard.service';

export const routes : Routes = [
  {path: 'login', component: TelaLoginComponent},
  {path: 'home', component: TelaInicialComponent, children: [
        {path: 'paciente', component: PacienteComponent, canActivate: [AuthGuardService] },
        {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
        {path: 'novo-paciente', component: NovoPacienteComponent, canActivate: [AuthGuardService] },
        {path: 'consulta', component: ConsultaComponent, canActivate: [AuthGuardService]},
        {path: 'nova-consulta', component: NovaConsultaComponent, canActivate: [AuthGuardService]},
        {path: 'paciente-detalhado/:id', component: PacienteDetalhadoComponent, canActivate: [AuthGuardService]},
        {path: 'iniciar-avaliacao/:id', component: AvaliacaoComponent, canActivate: [AuthGuardService]},
        {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
        {path: 'lembretes', component: LembretesComponent, canActivate: [AuthGuardService]},
        {path: 'novo-lembrete', component: NovoLembreteComponent, canActivate: [AuthGuardService]},
        {path: 'mensagens', component: MensagemComponent, canActivate: [AuthGuardService]}
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

    


