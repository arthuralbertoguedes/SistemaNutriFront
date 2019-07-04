import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {
  
  public passo1: boolean = true;
  public passo2: boolean = false;
  public items: any[];
  public imagens: any[];
  items1: MenuItem[];

  items2: MenuItem[];

  activeItem: MenuItem;

  constructor() { }

  ngOnInit() {

    this.imagens = [
          '../../assets/anamnese.png',
          '../../assets/antropometria.png',
          '../../assets/composicao.png',
          '../../assets/plano.png'
        ]


    this.items = [
        {label: 'Anamnese'},
        {label: 'Antropometria'},
        {label: 'Composição Corporal'},
        {label: 'Plano Alimentar'}
    ];

    this.items2 = [
        {label: 'Stats', icon: 'fa fa-fw fa-bar-chart'},
        {label: 'Calendar', icon: 'fa fa-fw fa-calendar'},
        {label: 'Documentation', icon: 'fa fa-fw fa-book'},
        {label: 'Support', icon: 'fa fa-fw fa-support'},
        {label: 'Social', icon: 'fa fa-fw fa-twitter'}
    ];

    this.activeItem = this.items[0];
  }
  
  iniciarPasso2(event: any){
     this.passo1 = false;
     this.passo2 = true;
  }
}
