import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})
export class TelaInicialComponent implements OnInit {

  public usuarioLogado: string;

  constructor() { }

  ngOnInit() {
        this.setarInformacoesUsuarioLogado();
    }


  setarInformacoesUsuarioLogado(): void{
    this.usuarioLogado = localStorage.getItem("usuario_nome");
  } 
}
