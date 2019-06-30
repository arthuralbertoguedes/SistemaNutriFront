import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '../../../../node_modules/@angular/forms';
import { AntropometriaService } from './antropometria-service';

@Component({
  selector: 'antropometria',
  templateUrl: './antropometria.component.html',
  styleUrls: ['./antropometria.component.css']
})
export class AntropometriaComponent implements OnInit {

  public antropometriaForm : FormGroup;

  constructor(private fb: FormBuilder, 
              private _antropometriaService: AntropometriaService) { }

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
      'coxaDireita': [''],
      'pescoco': [''],
      'ombro': [''],
      'peitoral': [''],
      'cintura': ['']

    })
  }

  salvar(): void{
    this._antropometriaService.salvar(this.antropometriaForm.value).subscribe(
            res=>alert('salvou'),
            (erro)=>console.log(erro)
        );

  }

}
