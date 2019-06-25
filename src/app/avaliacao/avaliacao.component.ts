import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {
  
  public passo1: boolean = true;
  public passo2: boolean = false;
  
  constructor() { }

  ngOnInit() {

  }
  
  iniciarPasso2(event: any){
     this.passo1 = false;
     this.passo2 = true;
  }
}
