import { Component, OnInit } from '@angular/core';
import { PacienteService } from './paciente.service';
import { Paciente } from './Paciente.model';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  public pacientes : Paciente[] = [];

  constructor(private pacienteService: PacienteService) { }

  ngOnInit() {

    this.pacienteService.listarTodos().subscribe(
        (res)=>{
              this.pacientes = res
              console.log(this.pacientes)
        },
        (err)=>console.log(err)  
    )

    
  }

}
