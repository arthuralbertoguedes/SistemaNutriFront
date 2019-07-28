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

  //  Variáveis para o ngIf
  //  Controle das informações que aparecerão 
  //  na tela de acordo com a escolha do usuário
  public anamneseAtivo: boolean               = false;
  public informacoesPessoaisAtivo: boolean    = false;
  public planoAlimentarAtivo: boolean         = false;
  public medidasAntropometricasAtivo: boolean = false;
  public historicoConsultaAtivo: boolean      = false;
  public historicoMensagensAtivo: boolean     = false;


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


  public mostrarAnamnese(): void{
      this.anamneseAtivo               = true;
      this.informacoesPessoaisAtivo    = false;
      this.historicoConsultaAtivo      = false;
      this.historicoMensagensAtivo     = false;
      this.medidasAntropometricasAtivo = false;
      this.planoAlimentarAtivo         = false;
  }

  public mostrarInformacoesPessoaisAtivo(): void{
    this.anamneseAtivo               = false;
    this.informacoesPessoaisAtivo    = true;
    this.historicoConsultaAtivo      = false;
    this.historicoMensagensAtivo     = false;
    this.medidasAntropometricasAtivo = false;
    this.planoAlimentarAtivo         = false;
}

public mostrarHistoricoConsultaAtivo(): void{
  this.anamneseAtivo               = false;
  this.informacoesPessoaisAtivo    = false;
  this.historicoConsultaAtivo      = true;
  this.historicoMensagensAtivo     = false;
  this.medidasAntropometricasAtivo = false;
  this.planoAlimentarAtivo         = false;
}

public mostrarHistoricoMensagensAtivo(): void{
  this.anamneseAtivo               = false;
  this.informacoesPessoaisAtivo    = false;
  this.historicoConsultaAtivo      = false;
  this.historicoMensagensAtivo     = true;
  this.medidasAntropometricasAtivo = false;
  this.planoAlimentarAtivo         = false;
}

public mostrarMedidasAntropometricasAtivo(): void{
  this.anamneseAtivo               = false;
  this.informacoesPessoaisAtivo    = false;
  this.historicoConsultaAtivo      = false;
  this.historicoMensagensAtivo     = false;
  this.medidasAntropometricasAtivo = true;
  this.planoAlimentarAtivo         = false;
}

  
public mostrarPlanoAlimentarAtivo(): void{
  this.anamneseAtivo               = false;
  this.informacoesPessoaisAtivo    = false;
  this.historicoConsultaAtivo      = false;
  this.historicoMensagensAtivo     = false;
  this.medidasAntropometricasAtivo = false;
  this.planoAlimentarAtivo         = true;
}

}
