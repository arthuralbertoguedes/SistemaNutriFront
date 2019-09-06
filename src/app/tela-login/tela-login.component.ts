import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Login } from '../models/login.model';
import { Token } from '../models/token.model';
import { AutenticacaoService } from '../autenticacao/usuario.service';
import { Usuario } from '../models/usuario.model';


@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.css']
})
export class TelaLoginComponent implements OnInit {

  public mensagemErro: string = "";
  public mostrarTelaCadastro: boolean = false;

  /* Variáveis para cadastro de novo usuário - vinculadas aos ngModel */
  public nomeCadastro: string = "";
  public senhaCadastro: string = "";
  public loginCadastro: string = "";
  public senhaNovamenteCadastro: string = "";
  public mensagemErroCadastro: string = "";

  public formularioLogin : FormGroup = new FormGroup({
    'usuario': new FormControl('',[Validators.minLength(1), Validators.required]),
    'senha' : new FormControl('',[Validators.minLength(5), Validators.required])
  });

  constructor(private router : Router,
              private _usuarioService: AutenticacaoService) { }

  ngOnInit() { }

  abrirTelaCadastro(): void{
    this.mostrarTelaCadastro = true;
  }

  abrirTelaLogar(): void{
    this.mostrarTelaCadastro = false;
  }

  onSubmit(f : FormGroup): void{
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

  cadastrarNovoUsuario(): void{
      if(!(this.nomeCadastro.length > 0 && this.loginCadastro.length > 0 && this.senhaCadastro.length > 0 && this.mensagemErroCadastro == "")){
         this.mensagemErroCadastro = "Preencha todos os campos!"
         return;
      }

      let novoUsuario = new Usuario();
      novoUsuario.nome = this.nomeCadastro;
      novoUsuario.senha = this.senhaCadastro;
      novoUsuario.login = this.loginCadastro;

      this._usuarioService.salvarUsuario(novoUsuario)
           .subscribe(
                res => {
                   this.mostrarTelaCadastro = false;
                }
           )
  }

  setarDadosUsuario(token: Token): void{
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

  verificarSenhas(): void{
      if(this.senhaCadastro != this.senhaNovamenteCadastro)
         this.mensagemErroCadastro = "Atenção! As senhas não coincidem!";
      else
         this.mensagemErroCadastro = "";
  }
}
