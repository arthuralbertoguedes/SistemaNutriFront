import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../paciente/paciente.service';
import { Paciente } from '../../paciente/Paciente.model';
import {FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { Utilitarios } from '../../recursos/utilitarios';
import { ConsultaService } from '../consulta.service';
import { Consulta } from '../consulta.model';

@Component({
  selector: 'app-nova-consulta',
  templateUrl: './nova-consulta.component.html',
  styleUrls: ['./nova-consulta.component.css']
})
export class NovaConsultaComponent implements OnInit {

  public listaPacientes: Paciente[] = [];
  public novaConsultaFormulario: FormGroup;

  constructor(private pacienteService: PacienteService,
              private fb: FormBuilder,
              private consultaService: ConsultaService) { }

  ngOnInit() { 
      this.novaConsultaFormulario = this.fb.group({
        'informacoesAdicionais': ['', Validators.required],
        'idPaciente': [''],
        'dataConsulta': [''],
        'horarioInicio': [''],
        'horarioFim': [''],
        'horarioDateTime': ['']
      })
  }


  public listarPacientes(event): void{
      let nomePaciente = event;
      this.pacienteService.listarPorNome(nomePaciente)
      .subscribe(res=>{
                      this.listaPacientes = res;
                }
      );
  }


  public vincularPaciente(event): void{
     this.novaConsultaFormulario.get('idPaciente').setValue(event.id);
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
                    alert('Consulta cadastrada');
                    this.resetarFormulario();
                }
            )
  }



  public validarForm(): void{
    
    let horarioInicio = (<HTMLInputElement>document.querySelector('#horarioInicio>span>input')).value;
    let horarioFim = (<HTMLInputElement>document.querySelector('#horarioFim>span>input')).value;
    let dataSelecionada =(<HTMLInputElement>document.getElementById('data')).value;
    let dataFormatada = Utilitarios.gerarData(dataSelecionada);
    this.novaConsultaFormulario.get('dataConsulta').setValue(dataFormatada);    
  
    let hora          = Number(horarioInicio.toString().substring(0,2));
    let minutos       = Number(horarioInicio.toString().substring(3,5));
    
    let ano           = Number(dataSelecionada.substring(6,10));
    let mes           = Number(dataSelecionada.substring(3,5));
    let dia           = Number(dataSelecionada.substring(0,2));

    //Criação do LocalDateTime que será utilizado no componente FullCalendar no Dashboard
    let dataConsultaDateTime = new Date(ano ,mes-1, dia, hora, minutos, Number('00'));

    this.novaConsultaFormulario.get('horarioInicio').setValue(horarioInicio);
    this.novaConsultaFormulario.get('horarioFim').setValue(horarioFim);
    this.novaConsultaFormulario.get('horarioDateTime').setValue(dataConsultaDateTime);
  }


  public resetarFormulario(): void{
      this.novaConsultaFormulario.reset();
      (<HTMLInputElement>document.querySelector('#horarioInicio>span>input')).value = "";
      (<HTMLInputElement>document.querySelector('#horarioFim>span>input')).value = "";
      (<HTMLInputElement>document.querySelector('#nomePaciente>span>input')).value = "";
      (<HTMLInputElement>document.querySelector('#data')).value = "";
  }


}
