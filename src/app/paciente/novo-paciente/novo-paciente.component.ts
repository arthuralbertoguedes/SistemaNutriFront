import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PacienteService } from '../paciente.service';
import { Paciente } from '../Paciente.model';
import { Utilitarios } from '../../recursos/utilitarios';
import { Endereco } from '../../models/endereco.model';
import { Router } from '../../../../node_modules/@angular/router';
import { tradutorCalendario } from '../../shared/tradutor-calendario';

@Component({
  selector: 'app-novo-paciente',
  templateUrl: './novo-paciente.component.html',
  styleUrls: ['./novo-paciente.component.css']
})
export class NovoPacienteComponent implements OnInit {

  public novoPacienteFormulario : FormGroup;
  public ptbr: any;
  public fotoPaciente = [];

  constructor(private formBuilder : FormBuilder,
              private _pacienteService : PacienteService,
              private route: Router) { }

  ngOnInit() {
        this.ptbr = tradutorCalendario;
        this.novoPacienteFormulario = this.formBuilder.group({
            'nome': ['', Validators.required],
            'telefone': ['', Validators.required],
            'estado': ['', Validators.required],
            'dataNascimento': ['', Validators.required],
            'cidade': ['', Validators.required],
            'email': ['', Validators.required],
            'cep': ['', Validators.required],
            'logradouro': ['', Validators.required],
            'genero': ['M'],
            'dataCadastro': [''],
            'endereco': ['']
        }) 
        
    }   

    public vincularDataConsulta(event: any){
        this.novoPacienteFormulario.get('dataNascimento').setValue(event);
    }

    public salvar() : void{
        console.log(this.fotoPaciente)
        return;
        this.validarForm();

        let modelSalvar = this.novoPacienteFormulario.value;
        console.log(modelSalvar);
        this._pacienteService.salvar(modelSalvar).subscribe(
            (res)=>{console.log(res)}
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
}
