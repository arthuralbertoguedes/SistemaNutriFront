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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConsultaModule } from './consulta/consulta.module';
import { UtilitariosModule } from './utilitarios/utilitarios.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { ConsultaService } from './consulta/consulta.service';
import { PacienteService } from './paciente/paciente.service';
import { LembretesComponent } from './lembretes/lembretes.component';
import { LembretesService } from './lembretes/lembretes.service';
import { NovoLembreteComponent } from './lembretes/novo-lembrete/novo-lembrete.component';
import { AutenticacaoService } from './autenticacao/usuario.service';
import { HttpRequestInterceptor } from './autenticacao/httpRequestInterceptor.service';
import {CarouselModule, Carousel} from 'primeng/carousel';
import { MensagemService } from './mensagem/mensagem.service';


@NgModule({
  declarations: [
    AppComponent,
    TelaLoginComponent,
    TelaInicialComponent,
    DashboardComponent,
    LembretesComponent,
    NovoLembreteComponent
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
    FullCalendarModule,
    CarouselModule
  ],
  exports: [
    
    
  ],
  providers: [
    AuthguardService,
    ConsultaService,
    PacienteService,
    LembretesService,
    AutenticacaoService,
    MensagemService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
