import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';
import { ComposicaoService } from './composicao-service';

@Component({
  selector: 'composicao-corporal',
  templateUrl: './composicao-corporal.component.html',
  styleUrls: ['./composicao-corporal.component.css']
})
export class ComposicaoCorporalComponent implements OnInit {

  public composicaoForm: FormGroup;

  constructor(private fb: FormBuilder,
              private _composicaoService: ComposicaoService) { }

  ngOnInit() {
    this.composicaoForm = this.fb.group({

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
      'coxa': ['']

    })
  }

  salvar(): void{
    this._composicaoService.salvar(this.composicaoForm.value).subscribe(
            res=>alert('salvou'),
            (erro)=>console.log(erro)
        );

  }

}
