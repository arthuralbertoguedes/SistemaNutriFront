import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { PacienteService } from '../paciente.service';
import { Paciente } from '../Paciente.model';

@Component({
  selector: 'app-paciente-detalhado',
  templateUrl: './paciente-detalhado.component.html',
  styleUrls: ['./paciente-detalhado.component.css']
})
export class PacienteDetalhadoComponent implements OnInit {

  public pacienteEscolhido: Paciente;
  public idadePaciente    : string;

  constructor(private route: ActivatedRoute,
              private _pacienteService: PacienteService) { }

  ngOnInit() {
    this.listarPacienteEscolhido(this.route.snapshot.params.id);
    

  }

  listarPacienteEscolhido(id: String): void{
      this._pacienteService.listarPorId(Number(id))
        .subscribe(res => {
             this.pacienteEscolhido = res;
             this.calcularIdadePaciente(res.dataNascimento as string);
          }
        );
  }


  public calcularIdadePaciente(dataNascimento: string): void {
    var dataNasc = new Date(dataNascimento);
    var hoje = new Date();
    var anoAtual = hoje.getFullYear();
    var dataAniversarioAnoAtual = new Date(anoAtual, dataNasc.getMonth(), dataNasc.getDate());
    var idade = anoAtual - dataNasc.getFullYear();
    if(dataAniversarioAnoAtual > hoje) {
      idade--;
    }
    this.idadePaciente = idade.toString();
  }
}
