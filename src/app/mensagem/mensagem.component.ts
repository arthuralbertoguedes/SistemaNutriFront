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
  public pacienteEscolhido: Paciente;
  public idadePaciente    : string;

  constructor(private route: ActivatedRoute,
              private _pacienteService: PacienteService,
              private _mensagemService: MensagemService) { }

  ngOnInit() {
    this.listarPacienteEscolhido(this.route.snapshot.params.id);
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

  listarPacienteEscolhido(id: String): void{
    this._pacienteService.listarPorId(Number(id))
      .subscribe(res => {
           this.pacienteEscolhido = res;
           this.calcularIdadePaciente(res.dataNascimento as string);
        }
      );
   }

   salvar(): void{

    let mensagem = new Mensagem();
    let usuario = new Usuario();
    usuario.id = Number(localStorage.getItem("usuario"));

    //Setando informações para serem enviadas corretamente ao Java
    mensagem.foiLida  = false;
    mensagem.paciente = this.pacienteEscolhido;
    mensagem.mensagem = this.mensagem;
    mensagem.usuario  = usuario;

    console.log(mensagem);
    this._mensagemService.salvarMensagem(mensagem)
      .subscribe(res =>{
          console.log(res);
      })
   }

   
}
