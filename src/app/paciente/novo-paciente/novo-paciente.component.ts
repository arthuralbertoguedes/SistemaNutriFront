import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PacienteService } from '../paciente.service';

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
            'nomeCompleto': ['', Validators.required],
            'telefone': ['', Validators.required],
            'estado': ['', Validators.required],
            'dataDeNascimento': ['', Validators.required],
            'cidade': ['', Validators.required],
            'email': ['', Validators.required],
            'cep': ['', Validators.required],
            'endereco': ['', Validators.required],
            'genero': ['M']
        }) 
        this.novoPacienteFormulario.get('dataDeNascimento').valueChanges.subscribe((e)=>{
            console.log('aaaa');
        })

        
    }   



    public teste() : void{
        let resposta$ = this._pacienteService.teste();
        resposta$.subscribe(
            (res)=>{console.log(res)},
            (err)=>{console.log(err)},
            ()=>{console.log("fim da requisição")}

        );
    }

    public salvar() : void{
        this._pacienteService.salvar().subscribe(
            (res)=>{console.log(res)}
        );
    }
}
