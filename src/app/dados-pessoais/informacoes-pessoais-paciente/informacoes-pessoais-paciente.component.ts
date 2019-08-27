import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { Message, MessageService } from '../../../../node_modules/primeng/api';
import { Paciente } from '../../paciente/Paciente.model';
import { Router } from '../../../../node_modules/@angular/router';
import { tradutorCalendario } from '../../shared/tradutor-calendario';
import { PacienteService } from '../../paciente/paciente.service';
import { Endereco } from '../../models/endereco.model';

@Component({
  selector: 'informacoes-pessoais-paciente',
  templateUrl: './informacoes-pessoais-paciente.component.html',
  styleUrls: ['./informacoes-pessoais-paciente.component.css']
})
export class InformacoesPessoaisPacienteComponent implements OnInit {

  @Input() pacienteEscolhido: any

  public dadosPacienteFormulario : FormGroup;
  public ptbr: any;
  public fotoPaciente = [];
  public msgs: Message[] = [];

  constructor(private formBuilder : FormBuilder,
              public _messageService: MessageService,
              public _pacienteService: PacienteService
             ) { }

  ngOnInit() {

        this.ptbr = tradutorCalendario;
        this.dadosPacienteFormulario = this.formBuilder.group({
            'nome': ['', Validators.required],
            'telefone': [''],
            'id': [''],
            'estado': [''],
            'dataNascimento': [''],
            'cidade': [''],
            'email': [''],
            'cep': ['', [Validators.maxLength(8),Validators.pattern('[0-9]*')]],
            'logradouro': [''],
            'genero': ['M'],
            'dataCadastro': [''],
            'endereco': ['']
        }) 
        

        this.dadosPacienteFormulario.patchValue(this.pacienteEscolhido);
        this.dadosPacienteFormulario.get('cidade').setValue(this.pacienteEscolhido.endereco.cidade);
        this.dadosPacienteFormulario.get('cep').setValue(this.pacienteEscolhido.endereco.cep);
        this.dadosPacienteFormulario.get('logradouro').setValue(this.pacienteEscolhido.endereco.logradouro);
        this.dadosPacienteFormulario.get('estado').setValue(this.pacienteEscolhido.endereco.estado);

    }   


    public salvar() : void{
      this.validarForm();

      let modelSalvar = this.dadosPacienteFormulario.value;
      this._pacienteService.salvar(modelSalvar).subscribe(
          (res)=>{
              this.mostrarMensagemSucesso();
          },
          (erro=>{
              this.mostrarMensagemErro();
          })
      );
  }

  public validarForm(): void{

      let enderecoPessoa = new Endereco();
      enderecoPessoa.cep = this.dadosPacienteFormulario.get('cep').value;
      enderecoPessoa.cidade = this.dadosPacienteFormulario.get('cidade').value;
      enderecoPessoa.logradouro = this.dadosPacienteFormulario.get('logradouro').value;
      enderecoPessoa.estado = this.dadosPacienteFormulario.get('estado').value;

      this.dadosPacienteFormulario.get('dataCadastro').setValue(this.pacienteEscolhido.dataCadastro);
      this.dadosPacienteFormulario.get('endereco').setValue(enderecoPessoa);
  }

  mostrarMensagemSucesso(): void {
      this._messageService.add({severity:'success', summary:'Paciente atualizado com sucesso!'});
      this.limparMensagem();
  }

  mostrarMensagemErro(): void {
      this._messageService.add({severity:'error', summary:'Ops! Algum problema aconteceu!'});
      this.limparMensagem();
  }

  limparMensagem(): void{
      setTimeout(()=>{
          this._messageService.clear();
      },4000);
  }


}
