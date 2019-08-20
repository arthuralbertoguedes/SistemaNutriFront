import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PacienteService } from '../paciente.service';
import { Paciente } from '../Paciente.model';
import { Utilitarios } from '../../recursos/utilitarios';
import { Endereco } from '../../models/endereco.model';
import { Router } from '../../../../node_modules/@angular/router';
import { tradutorCalendario } from '../../shared/tradutor-calendario';
import { Message, MessageService } from '../../../../node_modules/primeng/api';
@Component({
  selector: 'app-novo-paciente',
  templateUrl: './novo-paciente.component.html',
  styleUrls: ['./novo-paciente.component.css']
})
export class NovoPacienteComponent implements OnInit {

  public novoPacienteFormulario : FormGroup;
  public ptbr: any;
  public fotoPaciente = [];
  public msgs: Message[] = [];

  constructor(private formBuilder : FormBuilder,
              private _pacienteService : PacienteService,
              private route: Router,
              private _messageService: MessageService) { }

  ngOnInit() {
        this.ptbr = tradutorCalendario;
        this.novoPacienteFormulario = this.formBuilder.group({
            'nome': ['', Validators.required],
            'telefone': [''],
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
        
    }   

    public vincularDataConsulta(event: any){
        this.novoPacienteFormulario.get('dataNascimento').setValue(event);
    }

    public salvar() : void{
        this.validarForm();

        let modelSalvar = this.novoPacienteFormulario.value;
        this._pacienteService.salvar(modelSalvar).subscribe(
            (res)=>{
                this.mostrarMensagemSucesso();
                this.limparFormulario();
            },
            (erro=>{
                this.mostrarMensagemErro();
            })
        );
    }

    public validarForm(): void{

        let enderecoPessoa = new Endereco();
        enderecoPessoa.cep = this.novoPacienteFormulario.get('cep').value;
        enderecoPessoa.cidade = this.novoPacienteFormulario.get('cidade').value;
        enderecoPessoa.logradouro = this.novoPacienteFormulario.get('logradouro').value;
        enderecoPessoa.estado = this.novoPacienteFormulario.get('estado').value;

        let dataCadastro = Utilitarios.getDataAtual();
 
        this.novoPacienteFormulario.get('dataCadastro').setValue(dataCadastro);
        this.novoPacienteFormulario.get('endereco').setValue(enderecoPessoa);
    }

    public voltar(): void{
        this.route.navigate(['/home/paciente']);
    }

    myUploader(event: any){
        this.fotoPaciente = event;
    }

    mostrarMensagemSucesso(): void {
        this._messageService.add({severity:'success', summary:'Paciente cadastrado com sucesso!'});
    }

    mostrarMensagemErro(): void {
        this._messageService.add({severity:'error', summary:'Ops! Algum problema aconteceu!'});
    }

    limparFormulario(): void{
        this.novoPacienteFormulario.reset();
    }
}
