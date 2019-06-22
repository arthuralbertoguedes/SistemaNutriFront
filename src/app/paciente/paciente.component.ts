import { Component, OnInit } from '@angular/core';
import { PacienteService } from './paciente.service';
import { Paciente } from './Paciente.model';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  public pacientes : Paciente[] = [];

  constructor(private pacienteService: PacienteService,
              private router: Router) { }

  ngOnInit() {

    this.pacienteService.listarTodos().subscribe(
        (res)=>{
              this.pacientes = res
        },
        (err)=>console.log(err)  
    )

  }

  public verInformacoesPaciente(event: any): void{
      this.router.navigate([`home/paciente-detalhado/${event.id}`]);
  }

  public iniciarAtendimento(event: any): void{
    this.router.navigate([`home/iniciar-avaliacao/${event.id}`]);
}
}
