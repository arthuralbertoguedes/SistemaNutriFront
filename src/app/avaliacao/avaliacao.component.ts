import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { PacienteService } from '../paciente/paciente.service';
import { Paciente } from '../paciente/Paciente.model';


@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {
  
  public mostrarAnamnese: boolean = true;
  public mostrarAntropometria: boolean = false;
  public mostrarComposicaoCorporal: boolean = false;
  public items: any[];
  public imagens: any[];
  public pacienteEscolhido: Paciente;
  public idadePaciente    : string;
  
  items1: MenuItem[];
  items2: MenuItem[];
  activeItem: MenuItem;

  constructor(private route: ActivatedRoute,
              private _pacienteService: PacienteService) { }

  ngOnInit() {

    this.listarPacienteEscolhido(this.route.snapshot.params.id);

    this.imagens = [
          '../../assets/anamnese.png',
          '../../assets/antropometria.png',
          '../../assets/composicao.png',
          '../../assets/plano.png'
        ]


    this.items = [
        {label: 'Anamnese', mostrarComponent: 'mostrarAnamnese'},
        {label: 'Antropometria', mostrarComponent: 'mostrarAntropometria'},
        {label: 'Composição Corporal', mostrarComponent: 'mostrarComposicaoCorporal'}
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
  }

  iniciarAntropometria(): void{
      this.mostrarAnamnese           = false;
      this.mostrarAntropometria      = true;
      this.mostrarComposicaoCorporal = false;
  }

  iniciarComposicaoCorporal(): void{
      this.mostrarAnamnese           = false;
      this.mostrarAntropometria      = false;
      this.mostrarComposicaoCorporal = true;
  }


  abrirComponenteCorrespondente(item: any){
      let componenteClicado = item.mostrarComponent;
      if(componenteClicado=='mostrarAnamnese')
          this.iniciarAnamnese();
      else if(componenteClicado=='mostrarAntropometria')    
          this.iniciarAntropometria();
      else if(componenteClicado=='mostrarComposicaoCorporal')    
          this.iniciarComposicaoCorporal();
  }


  public calcularIdadePaciente(dataNascimento: string): void {
    var dataNasc = new Date(dataNascimento);
    var hoje = new Date();
    var anoAtual = hoje.getFullYear();
    var dataAniversarioAnoAtual = new Date(anoAtual, dataNasc.getMonth(), dataNasc.getDate());
    var idade = anoAtual - dataNasc.getFullYear();
    if(dataAniversarioAnoAtual > hoje) {
      idade--;
    }
    this.idadePaciente = idade.toString();
  }

  listarPacienteEscolhido(id: String): void{
    this._pacienteService.listarPorId(Number(id))
      .subscribe(res => {
           this.pacienteEscolhido = res;
           this.calcularIdadePaciente(res.dataNascimento as string);
        }
      );
   }
}
