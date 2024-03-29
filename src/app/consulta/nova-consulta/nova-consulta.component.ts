import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../paciente/paciente.service';
import { Paciente } from '../../paciente/Paciente.model';
import {FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { Utilitarios } from '../../recursos/utilitarios';
import { ConsultaService } from '../consulta.service';
import { Router } from '../../../../node_modules/@angular/router';
import { tradutorCalendario } from '../../shared/tradutor-calendario';
import { Message, MessageService } from '../../../../node_modules/primeng/api';

@Component({
  selector: 'app-nova-consulta',
  templateUrl: './nova-consulta.component.html',
  styleUrls: ['./nova-consulta.component.css']
})
export class NovaConsultaComponent implements OnInit {

  public listaPacientes: Paciente[] = [];
  public novaConsultaFormulario: FormGroup;
  public ptbr: any;
  public dataConsulta: Date = new Date();
  public msgs: Message[] = [];

  constructor(private pacienteService: PacienteService,
              private fb: FormBuilder,
              private consultaService: ConsultaService,
              private route: Router,
              private _messageService: MessageService) { }

  ngOnInit() { 
      this.inicializardataConsulta();
      this.ptbr = tradutorCalendario;

      this.novaConsultaFormulario = this.fb.group({
        'informacoesAdicionais': [''],
        'paciente': ['', Validators.required],
        'dataConsulta': ['', Validators.required],
        'horarioInicio': ['', Validators.required],
        'horarioFim': ['', Validators.required],
        'horarioDateTime': ['']
      })

  }

  public validarHorarioInicio(event: any): void{
      if(event.target.value.toString().length == 5)
        this.novaConsultaFormulario.get('horarioInicio').setErrors(null);
  }

  public validarHorarioFim(event: any): void{
    if(event.target.value.toString().length == 5)
      this.novaConsultaFormulario.get('horarioFim').setErrors(null);
}


  public listarPacientes(event): void{
      let nomePaciente = event;
      this.pacienteService.listarPorNome(nomePaciente)
      .subscribe(res=>{
                      console.log(res);
                      this.listaPacientes = res;
                }
      );
  }

  public vincularDataConsulta(event: any): void{
      this.novaConsultaFormulario.get('dataConsulta').setValue(event);
  }

  public vincularPaciente(event): void{
     this.novaConsultaFormulario.get('paciente').setValue(event.id);
  }



  public vincularHorarioInicio(event): void{
      this.novaConsultaFormulario.get('horarioDateTime').setValue(event);
      let horarioInicio = Utilitarios.pegarHorarioData(event.toString());
      this.novaConsultaFormulario.get('horarioInicio').setValue(horarioInicio);
  }



  public vincularHorarioFim(event): void{
      let horarioFim = Utilitarios.pegarHorarioData(event.toString());
      this.novaConsultaFormulario.get('horarioFim').setValue(horarioFim);
  }


  public salvar(): void{
       
        this.validarForm();
        let consulta = this.novaConsultaFormulario.value;
        this.consultaService.salvarConsulta(consulta)
            .subscribe(
                res=>{
                    this.mostrarMensagemSucesso();
                    this.resetarFormulario();
                },
                erro => {
                    this.mostrarMensagemErro();
                }
            )
  }

  public validarForm(): void{
    let dataSelecionada: Date;
    let horarioInicio = (<HTMLInputElement>document.querySelector('#horarioInicio>span>input')).value;
    let horarioFim = (<HTMLInputElement>document.querySelector('#horarioFim>span>input')).value;
    dataSelecionada = this.novaConsultaFormulario.get('dataConsulta').value;  
  
    let hora          = Number(horarioInicio.toString().substring(0,2));
    let minutos       = Number(horarioInicio.toString().substring(3,5));
    
    let ano           = dataSelecionada.getFullYear();
    let mes           = dataSelecionada.getMonth();
    let dia           = dataSelecionada.getDate();

    //Criação do LocalDateTime que será utilizado no componente FullCalendar no Dashboard
    let dataConsultaDateTime = new Date(ano ,mes, dia, hora, minutos, Number('00'));

    this.novaConsultaFormulario.get('horarioInicio').setValue(horarioInicio);
    this.novaConsultaFormulario.get('horarioFim').setValue(horarioFim);
    this.novaConsultaFormulario.get('horarioDateTime').setValue(dataConsultaDateTime);

    let paciente = new Paciente();
    let idPaciente = this.novaConsultaFormulario.get('paciente').value;
    paciente.id = idPaciente;
    paciente.nome = 'arthur';
    paciente.genero = 'M';

    this.novaConsultaFormulario.get('paciente').setValue(paciente);
  }


  public resetarFormulario(): void{
      this.novaConsultaFormulario.reset();
      (<HTMLInputElement>document.querySelector('#horarioInicio>span>input')).value = "";
      (<HTMLInputElement>document.querySelector('#horarioFim>span>input')).value = "";
      (<HTMLInputElement>document.querySelector('#nomePaciente>span>input')).value = "";
      (<HTMLInputElement>document.querySelector('#data')).value = "";
  }

  public voltar(): void{
      this.route.navigate(['/home/consulta']);
  }

  inicializardataConsulta(): void{
    this.dataConsulta.setMinutes(0);
    this.dataConsulta.setHours(0);
    this.dataConsulta.setMilliseconds(0);
    this.dataConsulta.setSeconds(0);
  }

  mostrarMensagemSucesso(): void {
    this._messageService.add({severity:'success', summary:'Consulta cadastrada com sucesso!'});
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


}
