import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { TelaInicialModule } from './tela-inicial/tela-inicial.module';
import { AuthguardService } from './guards/authguard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ConsultaModule } from './consulta/consulta.module';
import { UtilitariosModule } from './utilitarios/utilitarios.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { FullCalendarModule } from '../../node_modules/primeng/fullcalendar';
import { ConsultaService } from './consulta/consulta.service';


@NgModule({
  declarations: [
    AppComponent,
    TelaLoginComponent,
    TelaInicialComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TelaInicialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConsultaModule,
    UtilitariosModule,
    AvaliacaoModule,
    FullCalendarModule
  ],
  exports: [
    
  ],
  providers: [
    AuthguardService,
    ConsultaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
