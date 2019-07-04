import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Alimento } from './alimento.model';
import { PlanoAlimentarService } from './plano-alimentar.service';

@Component({
  selector: 'plano-alimentar',
  templateUrl: './plano-alimentar.component.html',
  styleUrls: ['./plano-alimentar.component.css']
})
export class PlanoAlimentarComponent implements OnInit {

  public planoAlimentarForm: FormGroup;

  public alimentosRetornados: Alimento[];

  constructor(private fb: FormBuilder,
              private _service: PlanoAlimentarService) { }

  ngOnInit() {

      this.planoAlimentarForm = this.fb.group({
         'alimentos':['']
      })
  }

  adicionarAlimento(event) : void{
      console.log(event)
  } 

  buscarAlimentos(pesquisa) : void{
      this._service.listarAlimentos(pesquisa.query)
          .subscribe( 
                res => {
                    this.alimentosRetornados = res;
                },
                erro => {
                }
          );
  }
}
