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
        'pacienteId': [''],
        'dataConsulta': [''],
        'horarioInicio': [''],
        'horarioFim': ['']
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
     this.novaConsultaFormulario.get('pacienteId').setValue(event.id);
  }

  public vincularHorarioInicio(event): void{
      this.novaConsultaFormulario.get('horarioInicio').setValue(event);
  }

  public vincularHorarioFim(event): void{
      this.novaConsultaFormulario.get('horarioFim').setValue(event);
  }

  public salvar(){
        let dataSelecionada =(<HTMLInputElement>document.getElementById('data')).value;
        this.novaConsultaFormulario.get('dataConsulta').setValue(dataSelecionada);
        
        let consulta = new Consulta();
        this.consultaService.salvarConsulta(consulta)
        console.log(this.novaConsultaFormulario.value);
  }
}
