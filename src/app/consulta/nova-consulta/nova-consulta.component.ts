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
        let dataSelecionada =(<HTMLInputElement>document.getElementById('data')).value;
        let dataFormatada = Utilitarios.gerarData(dataSelecionada);
        this.novaConsultaFormulario.get('dataConsulta').setValue(dataFormatada);
        
        this.validarForm();

        let consulta = this.novaConsultaFormulario.value;
        console.log(consulta)
        this.consultaService.salvarConsulta(consulta)
            .subscribe(
                res=>{
                    alert('Consulta cadastrada');
                }
            )
  }

  public validarForm(): void{
      
    if(this.novaConsultaFormulario.get('horarioInicio').value==undefined 
    || this.novaConsultaFormulario.get('horarioFim').value ==undefined
    || this.novaConsultaFormulario.get('horarioInicio').value ==''
    || this.novaConsultaFormulario.get('horarioFim').value ==''            ){
        let horarioInicioConsulta = (<HTMLInputElement>document.querySelector('#horarioInicio span input')).value;
        let horarioFimConsulta =    (<HTMLInputElement>document.querySelector('#horarioFim span input')).value;
        this.novaConsultaFormulario.get('horarioInicio').setValue(horarioInicioConsulta);
        this.novaConsultaFormulario.get('horarioFim').setValue(horarioFimConsulta);
        
    }   
  }

}
