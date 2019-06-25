import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'antropometria',
  templateUrl: './antropometria.component.html',
  styleUrls: ['./antropometria.component.css']
})
export class AntropometriaComponent implements OnInit {

  public antropometriaForm : FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.antropometriaForm = this.fb.group({
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
      'coxaDireita': ['']
    })
  }

}
