import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { Router } from '../../../node_modules/@angular/router';

import { AuthguardService } from '../guards/authguard.service';
import { Infos_globais } from '../shared/constantes';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.css']
})
export class TelaLoginComponent implements OnInit {

  public formularioLogin : FormGroup = new FormGroup({
    'usuario': new FormControl('',[Validators.minLength(1), Validators.required]),
    'senha' : new FormControl('',[Validators.minLength(5), Validators.required])
  });

  constructor(private router : Router) { }

  ngOnInit() {
    
    
  }


  

  

  onSubmit(f : FormGroup){
      let usuario = this.formularioLogin.get('usuario').value;
      let senha = this.formularioLogin.get('senha').value;
      if(usuario=='art' && senha=='123'){ 
          localStorage.setItem("token", "123123123");
          Infos_globais.token = '123123123';
          this.router.navigate(['/home']);
      }
  }
}
