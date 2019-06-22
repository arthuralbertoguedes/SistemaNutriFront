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
     this.novaConsultaFormulario.get('idPaciente').setValue(event.id);
  }

  public vincularHorarioInicio(event): void{
      let horarioInicio = Utilitarios.pegarHorarioData(event.toString());
      this.novaConsultaFormulario.get('horarioInicio').setValue(horarioInicio);
  }

  public vincularHorarioFim(event): void{
      let horarioFim = Utilitarios.pegarHorarioData(event.toString());
      this.novaConsultaFormulario.get('horarioFim').setValue(horarioFim);
  }

  public salvar(){
        let dataSelecionada =(<HTMLInputElement>document.getElementById('data')).value;
        let dataFormatada = Utilitarios.gerarData(dataSelecionada);
        this.novaConsultaFormulario.get('dataConsulta').setValue(dataFormatada);
        
        let consulta = this.novaConsultaFormulario.value;
        console.log(consulta)
        this.consultaService.salvarConsulta(consulta)
        .subscribe(
            res=>console.log(res),
            erro=>console.log(erro)
        )
  }
}
