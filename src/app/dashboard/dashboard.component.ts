import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ConsultaService } from '../consulta/consulta.service';
import { Consulta } from '../consulta/consulta.model';
import { PacienteService } from '../paciente/paciente.service';
import { Paciente } from '../paciente/Paciente.model';
import { LembretesService } from '../lembretes/lembretes.service';
import { Lembrete } from '../models/lembrete.model';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  public events: any[] = [];
  public options: any;
  public ultimosPacientes: Paciente[] = [];
  public idadePaciente: string;
  public dataLembrete: Date = new Date();
  public lembretes: Lembrete[] = [];

  constructor(private _consultaService: ConsultaService,
              private _pacienteService: PacienteService,
              private _lembreteService: LembretesService,
              private router          : Router) {
      
   }

  ngOnInit() {

    this.inicializarDataLembrete();
    //Listando as consultas   
    this._consultaService.listar()
        .subscribe(
            res =>{
                this.carregarConsultas(res);
            }
        )

    //Listando os últimos pacientes cadastrados
    this._pacienteService.listarUltimosCadastros()
        .subscribe(
            res => {
                this.ultimosPacientes = res;
                res.forEach((elemento)=>{
                    this.calcularIdadePaciente(elemento.dataNascimento as string);
                })
            }
        )

  /*  this.events = [
      {
          "title": "Consulta Ester Macena",
          "start": "2019-07-01",
          "textColor": "red",
          "editable": "true",
          "id": "dia",
          "click": "alert('oi')"
      },
      {
          "title": "Pagar cartão",
          "start": "2019-07-07",
          "end": "2019-07-10",
          "backgroundColor": "#aabbcc"
      },
      {
          "title": "Fazer cocô",
          "start": "2019-07-09T16:00:00"
      
      {
          "title": "Tomar banho",
          "start": "2019-07-16T16:00:00"
      },
      {
          "title": "Banho de novo =(",
          "start": "2019-07-11",
          "end": "2019-07-13"
      },
      {
        "title": "Segundo banho",
        "start": "2019-07-16T16:00:00"
      },
      {
        "title": "terceiro banho",
        "start": "2019-07-16T16:01:00"
      },
      {
        "title": "quarto banho",
        "start": "2019-07-16T12:30:00"
      }

    ];*/

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      timeZone: 'BRT',
      header: {
          left: 'title',
          center: 'week',
          right: 'prev,next'
      },
      locale: 'pt-br',
      editable: false,
    /* titleFormat: {
        year: 'numeric', month: 'long', day: 'numeric'
      },*/
      dateClick: (e) =>  {
        console.log(e);
      },
      eventClick: (e) => {
        console.log(e);
      }
    };


  }

  public carregarConsultas(res: Consulta[]): void{
      let arrayConsultaCalendar: any[] = [];
        res.forEach((element: Consulta) => {
              arrayConsultaCalendar.push( 
                  {   
                    //Colocar aqui o nome do paciente, que virá com o JPA na consulta
                     'title': `: ${element.paciente.nome}`,
                     'start': element.horarioDateTime
                  }
              )
        })
        
      this.events = arrayConsultaCalendar;
  }

  public calcularIdadePaciente(dataNascimento: string): string {
    var dataNasc = new Date(dataNascimento);
    var hoje = new Date();
    var anoAtual = hoje.getFullYear();
    var dataAniversarioAnoAtual = new Date(anoAtual, dataNasc.getMonth(), dataNasc.getDate());
    var idade = anoAtual - dataNasc.getFullYear();
    if(dataAniversarioAnoAtual > hoje) {
      idade--;
    }
    return idade.toString();
  }

  inicializarDataLembrete(): void{
        this.dataLembrete.setMinutes(0);
        this.dataLembrete.setHours(0);
        this.dataLembrete.setMilliseconds(0);
        this.dataLembrete.setSeconds(0);
        this.buscarLembretesDia();
  }

  public buscarLembretesDia(): void{
         //Listando os lembretes do dia
        this._lembreteService.buscarLembretesDia(this.dataLembrete)
        .subscribe(
            res => {
                this.lembretes = res;
            },
            erro=>console.log(erro),
            ()=>{
                if(this.lembretes.length==0){
                    this.lembretes.push(new Lembrete('Nenhum lembrete encontrado para hoje'));
                }
            }
        )
  }

  public verInformacoesPaciente(event: any): void{
      this.router.navigate([`home/paciente-detalhado/${event}`])
  }
}
