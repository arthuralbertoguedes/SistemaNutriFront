import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';


@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})
export class TelaInicialComponent implements OnInit {

  public usuarioLogado: string;

  constructor(private router: Router) { }

  ngOnInit() {
        this.setarInformacoesUsuarioLogado();
    }


  setarInformacoesUsuarioLogado(): void{
    this.usuarioLogado = localStorage.getItem("usuario_nome");
  } 

  logout(): void{
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
