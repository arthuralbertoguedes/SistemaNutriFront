import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';
import { ComposicaoService } from './composicao-service';
import { Paciente } from '../../paciente/Paciente.model';
import { ComposicaoCorporal } from '../../models/composicao-corporal.model';

@Component({
  selector: 'composicao-corporal',
  templateUrl: './composicao-corporal.component.html',
  styleUrls: ['./composicao-corporal.component.css']
})
export class ComposicaoCorporalComponent implements OnInit {

  public composicaoForm: FormGroup;
  public idPaciente    : Number;
  @Input() paciente: Paciente;

  constructor(private fb: FormBuilder,
              private _composicaoService: ComposicaoService) { }

  ngOnInit() {

    let interval = setInterval(()=>{
      console.log(this.paciente)
      if(this.paciente!=undefined){
          this.idPaciente = this.paciente.id;
          this.buscarComposicaoPacienteEscolhido();
          clearInterval(interval);
      }     
   }, 500);


    this.composicaoForm = this.fb.group({
      'id': [''],
      'massaGorda': [''],
      'massaMagra': [''],
      'aguaCorporal': [''],
      'pesoOsseo': [''],
      'pesoResidual': [''],
      'pesoMuscular': [''],
      'gorduraVisceral': [''],
      'idadeMetabolica': [''],
      'triceps': [''],
      'biceps': [''],
      'subescapular': [''],
      'toracica': [''],
      'axilarMedia': [''],
      'supraIliaca': [''],
      'abdominal': [''],
      'coxa': [''],
      'paciente': ['']

    })
  }

  salvar(): void{
    let paciente = new Paciente();
    paciente = this.paciente;
    this.composicaoForm.get('paciente').setValue(paciente);
    this._composicaoService.salvar(this.composicaoForm.value).subscribe(
            res=>alert('salvou'),
            (erro)=>console.log(erro)
        );

  }

  buscarComposicaoPacienteEscolhido(): void{
      this._composicaoService.buscarPorIdPaciente(this.idPaciente)
        .subscribe(res=>{
            this.setarComposicaoCorporalPaciente(res as ComposicaoCorporal);
        })
  }

  setarComposicaoCorporalPaciente(composicaoCorporalModel: ComposicaoCorporal): void{
      this.composicaoForm.patchValue(composicaoCorporalModel)
  }
}
