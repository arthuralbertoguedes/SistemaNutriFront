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
import { Infos_globais } from './shared/constantes';


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
    TelaInicialModule
    
    
  ],
  exports: [
    
  ],
  providers: [AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
