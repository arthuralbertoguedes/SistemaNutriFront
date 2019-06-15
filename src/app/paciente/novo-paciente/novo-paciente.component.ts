import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PacienteService } from '../paciente.service';
import { Paciente } from '../Paciente.model';
import { Utilitarios } from '../../recursos/utilitarios';

@Component({
  selector: 'app-novo-paciente',
  templateUrl: './novo-paciente.component.html',
  styleUrls: ['./novo-paciente.component.css']
})
export class NovoPacienteComponent implements OnInit {

  public novoPacienteFormulario : FormGroup;

  constructor(private formBuilder : FormBuilder,
              private _pacienteService : PacienteService) { }

  ngOnInit() {
        this.novoPacienteFormulario = this.formBuilder.group({
            'nome': ['', Validators.required],
            'telefone': ['', Validators.required],
            'estado': ['', Validators.required],
            'dataNascimento': ['', Validators.required],
            'cidade': ['', Validators.required],
            'email': ['', Validators.required],
            'cep': ['', Validators.required],
            'endereco': ['', Validators.required],
            'genero': ['M'],
            'dataCadastro': ['']
        }) 


        
    }   

    public salvar() : void{
        let dataSelecionada =(<HTMLInputElement>document.getElementById('data')).value;
        let dataFormatada = Utilitarios.gerarData(dataSelecionada);
        let dataCadastro = Utilitarios.getDataAtual();
 
        this.novoPacienteFormulario.get('dataNascimento').setValue(dataFormatada);
        this.novoPacienteFormulario.get('dataCadastro').setValue(dataCadastro);

        let modelSalvar = this.novoPacienteFormulario.value;
        
        this._pacienteService.salvar(modelSalvar).subscribe(
            (res)=>{console.log(res)}
        );
    }
}
