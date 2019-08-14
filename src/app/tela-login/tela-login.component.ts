import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Login } from '../models/login.model';
import { Token } from '../models/token.model';
import { AutenticacaoService } from '../autenticacao/usuario.service';


@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.css']
})
export class TelaLoginComponent implements OnInit {

  public mensagemErro: string = "";

  public formularioLogin : FormGroup = new FormGroup({
    'usuario': new FormControl('',[Validators.minLength(1), Validators.required]),
    'senha' : new FormControl('',[Validators.minLength(5), Validators.required])
  });

  constructor(private router : Router,
              private _usuarioService: AutenticacaoService) { }

  ngOnInit() { }


  

  

  onSubmit(f : FormGroup){
      let model = new Login();
      model.usuario = this.formularioLogin.value.usuario;
      model.senha   = this.formularioLogin.value.senha;

          this._usuarioService.buscarUsuario(model)
            .subscribe(res => {
                this.setarDadosUsuario(res as Token);
                },
                (erro) => {
                  this.mostrarMensagemErro(erro.error.message);
                }
          
            )
      
  }

  mostrarMensagemErro(erro: any): void{
    this.mensagemErro = erro;
  } 

  setarDadosUsuario(token: Token){
    if(token.usuario_id > 0 && token.usuario_id != null){
       localStorage.setItem("usuario_id", String(token.usuario_id));
       localStorage.setItem("permissao", String(token.permissao_id));
       localStorage.setItem("usuario_nome", String(token.usuario_nome));
       localStorage.setItem("token", String(token.token));

       if(token != null && token != undefined)
          this.router.navigate(['/home/dashboard']);
       return;
    }
    else
      this.mostrarMensagemErro("Usuário e/ou senha inválidos");
  }
}
