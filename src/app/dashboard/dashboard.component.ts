import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ConsultaService } from '../consulta/consulta.service';
import { Consulta } from '../consulta/consulta.model';
import { PacienteService } from '../paciente/paciente.service';
import { Paciente } from '../paciente/Paciente.model';

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

  constructor(private _consultaService: ConsultaService,
              private _pacienteService: PacienteService) {
      
   }

  ngOnInit() {
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
          left: 'prev,next',
          center: 'title',
          right: 'week'
      },
      locale: 'pt-br',
      editable: true,
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
        console.log(res);
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

}
