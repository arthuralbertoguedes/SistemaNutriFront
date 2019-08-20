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
  public pesquisa  : string;

  constructor(private _pacienteService: PacienteService,
              private router: Router) { }

  ngOnInit() {

    this._pacienteService.listarPorNome('a').subscribe(
        (res)=>{
              this.pacientes = res
              console.log(res);
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

  public enviarMensagem(event: any) :void{
      this.router.navigate([`home/mensagens/${event.id}`]);
  } 

  public pesquisarPaciente(): void{
      this._pacienteService.listarPorNome(this.pesquisa)
        .subscribe(res =>{
            this.pacientes = res;
            console.log(this.pacientes)
        })
  }

}
