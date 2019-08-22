import { Component, OnInit } from '@angular/core';
import { ConsultaService } from './consulta.service';
import { Consulta } from './consulta.model';
import { MessageService, Message, ConfirmationService } from '../../../node_modules/primeng/api';
import { tradutorCalendario } from '../shared/tradutor-calendario';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  public listaConsultas: Consulta[];
  public pesquisa: string = "";
  public msgs: Message[] = [];
  public ptbr: any;
  public dataInicio: any;
  public dataFim: any;

  constructor(private _consultaService: ConsultaService,
              private _messageService: MessageService,
              private _confirmationService: ConfirmationService) {}

  ngOnInit() {
      this.ptbr = tradutorCalendario;
      this._consultaService.listar()
          .subscribe(
                res=>{
                    this.listaConsultas = res;
                    console.log(res);
                }
          )
  }

  public pesquisarConsulta(): void{
      let nomePaciente;
      if(this.pesquisa == "")
         nomePaciente = "flagListarTodos";
      else
         nomePaciente = this.pesquisa;

      let objetoPesquisaConsulta =
        {
            pesquisa: nomePaciente, 
            dataInicio: this.dataInicio,
            dataFim: this.dataFim
        }
         
      this._consultaService.buscarConsultaPorNomePaciente(objetoPesquisaConsulta)  
        .subscribe(res => {
            this.listaConsultas = res;
        })
  }

  public confirmarCancelamentoConsulta(consulta: Consulta): void{
        this._confirmationService.confirm({
            message: `Tem certeza que deseja cancelar a consulta com ${consulta.paciente.nome}?`,
            accept: () => {
                this.cancelarConsulta(consulta.id);
            }
        });
   }      

   public cancelarConsulta(consultaId: Number): void{
       this._consultaService.cancelarConsulta(Number(consultaId))
         .subscribe(
             res => {
                  this.pesquisarConsulta();
                  this.mostrarMensagemSucesso();
             },
             erro => {
                  this.mostrarMensagemErro();
             }
         )
   }

  
    mostrarMensagemSucesso(): void {
        this._messageService.add({severity:'success', summary:'Consulta cancelada com sucesso!'});
        this.limparMensagem();
    }

    mostrarMensagemErro(): void {
        this._messageService.add({severity:'error', summary:'Ops! Algum problema aconteceu!'});
        this.limparMensagem();
    }

    limparMensagem(): void{
        setTimeout(()=>{
            this._messageService.clear();
        },4000);
    }

    public vincularDataInicio(event: any): void{
        this.dataInicio = event;
    }

    public vincularDataFim(event: any): void{
        this.dataFim = event;
    }


}
