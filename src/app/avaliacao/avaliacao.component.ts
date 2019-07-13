import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {
  
  public mostrarAnamnese: boolean = true;
  public mostrarAntropometria: boolean = false;
  public mostrarComposicaoCorporal: boolean = false;
  public mostrarPlanoAlimentar: boolean = false;
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
        {label: 'Anamnese', mostrarComponent: 'mostrarAnamnese'},
        {label: 'Antropometria', mostrarComponent: 'mostrarAntropometria'},
        {label: 'Composição Corporal', mostrarComponent: 'mostrarComposicaoCorporal'},
        {label: 'Plano Alimentar', mostrarComponent: 'mostrarPlanoAlimentar'}
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
  
  iniciarAnamnese(): void{
      this.mostrarAnamnese           = true;
      this.mostrarAntropometria      = false;
      this.mostrarComposicaoCorporal = false;
      this.mostrarPlanoAlimentar     = false;
  }

  iniciarAntropometria(): void{
      this.mostrarAnamnese           = false;
      this.mostrarAntropometria      = true;
      this.mostrarComposicaoCorporal = false;
      this.mostrarPlanoAlimentar     = false;
  }

  iniciarComposicaoCorporal(): void{
      this.mostrarAnamnese           = false;
      this.mostrarAntropometria      = false;
      this.mostrarComposicaoCorporal = true;
      this.mostrarPlanoAlimentar     = false;
  }

  iniciarPlanoAlimentar(): void{   
      this.mostrarAnamnese           = false;
      this.mostrarAntropometria      = false;
      this.mostrarComposicaoCorporal = false;
      this.mostrarPlanoAlimentar     = true;
  }

  abrirComponenteCorrespondente(item: any){
      let componenteClicado = item.mostrarComponent;
      if(componenteClicado=='mostrarAnamnese')
          this.iniciarAnamnese();
      else if(componenteClicado=='mostrarAntropometria')    
          this.iniciarAntropometria();
      else if(componenteClicado=='mostrarComposicaoCorporal')    
          this.iniciarComposicaoCorporal();
      else if(componenteClicado=='mostrarPlanoAlimentar')    
          this.iniciarPlanoAlimentar();  
  }
}
