import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '../../../../node_modules/@angular/forms';
import { AntropometriaService } from './antropometria-service';
import { Paciente } from '../../paciente/Paciente.model';
import { Antropometria } from '../../models/antropometria.model';

@Component({
  selector: 'antropometria',
  templateUrl: './antropometria.component.html',
  styleUrls: ['./antropometria.component.css']
})
export class AntropometriaComponent implements OnInit {

  public antropometriaForm : FormGroup;

  public idPacienteEscolhido: Number;
  
  @Input() paciente: Paciente;

  constructor(private fb: FormBuilder, 
              private _antropometriaService: AntropometriaService) { }

  ngOnInit() {

    let interval = setInterval(()=>{
            if(this.paciente!=undefined){
                this.idPacienteEscolhido = this.paciente.id;
                this.buscarAntropometriaPaciente();
                clearInterval(interval);
            }
        },500);
  
    this.antropometriaForm = this.fb.group({
      'id': [''],
      'altura': [''],
      'peso': [''],
      'imc': [''],
      'idade': [''],
      'observacao': [''],
      'bracoRelaxadoDireito': [''],
      'bracoContraidoDireito': [''],
      'bracoRelaxadoEsquerdo': [''],
      'bracoContraidoEsquerdo': [''],
      'antebracoRelaxadoDireito': [''],
      'antebracoContraidoDireito': [''],
      'antebracoRelaxadoEsquerdo': [''],
      'antebracoContraidoEsquerdo': [''],
      'panturrilhaEsquerda': [''],
      'panturrilhaDireita': [''],
      'coxaEsquerda': [''],
      'coxaDireita': [''],
      'pescoco': [''],
      'ombro': [''],
      'peitoral': [''],
      'cintura': [''],
      'paciente': ['']

    })
  }

  salvar(): void{
    let paciente = new Paciente();
    paciente = this.paciente;
    this.antropometriaForm.get('paciente').setValue(paciente);
    this._antropometriaService.salvar(this.antropometriaForm.value).subscribe(
            res=>alert('salvou'),
            (erro)=>console.log(erro)
        );

  } 

  //Busca as informações atuais de antropometria do paciente
  buscarAntropometriaPaciente(): void{
      this._antropometriaService.buscarPorIdPaciente(this.idPacienteEscolhido)
        .subscribe(res=>{
            this.carregarAntropometriaPaciente(res as Antropometria);
        })
  }

  //Carrega antropometria anteriormente cadastrada (caso haja)
  carregarAntropometriaPaciente(antropometriaModel: any): void{
      this.antropometriaForm.patchValue(antropometriaModel);
  }
}
