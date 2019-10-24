import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { PacienteService } from '../paciente/paciente.service';
import { Paciente } from '../paciente/Paciente.model';
import { Mensagem } from '../models/mensagem.model';
import { Usuario } from '../models/usuario.model';
import { MensagemService } from './mensagem.service';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit {

  public mensagem: string;
  public listaPacientes: Paciente[];
  public idadePaciente    : string;
  public pacienteEscolhido: Paciente;
  public usuarioId: number;
  public mostrarHistorico: boolean = false;
  public mensagens: Mensagem[] = [];

  constructor(private route: ActivatedRoute,
              private _pacienteService: PacienteService,
              private _mensagemService: MensagemService) { }

  ngOnInit() {
     this.usuarioId = Number(localStorage.getItem('usuario_id'));
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

   salvar(): void{

    let mensagem = new Mensagem();
    let usuario = new Usuario();
    usuario.id = this.usuarioId;

    //Setando informações para serem enviadas corretamente ao Java
    mensagem.foiLida  = false;
    mensagem.paciente = this.pacienteEscolhido;
    mensagem.mensagem = this.mensagem;
    mensagem.usuario  = usuario;

    console.log(mensagem);
    this._mensagemService.salvarMensagem(mensagem)
      .subscribe(res =>{
          this.mensagem = "";
          console.log(res);
      })
   }

   public listarPacientes(event): void{
    let nomePaciente = event;
    this._pacienteService.listarPorNome(nomePaciente)
    .subscribe(res=>{
                    this.listaPacientes = res;
              }
    );
  }

  public vincularPaciente(event): void{
    this.pacienteEscolhido = event;
  }

  public abrirHistoricoMensagens(): void{
     this.mostrarHistorico = true;

     this._mensagemService.buscarMensagens(Number(this.pacienteEscolhido.id), this.usuarioId)
        .subscribe(
            res => {
              console.log(res);
              this.mensagens = res;
            }
        )
  }
    
}
