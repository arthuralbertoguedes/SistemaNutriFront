import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { PacienteComponent } from './paciente/paciente.component';

export const routes : Routes = [
  {path: 'login', component: TelaLoginComponent},
  {path: 'index', component: TelaInicialComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'paciente', component: PacienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

    


