import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';
import { AnamneseService } from './anamnese.service';



@Component({
  selector: 'anamnese',
  templateUrl: './anamnese.component.html',
  styleUrls: ['./anamnese.component.css']
})
export class AnamneseComponent implements OnInit {

  public anamneseForm: FormGroup;
  @Output() chamarAnamnese: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder,
              private _service: AnamneseService) { }

  ngOnInit() {

    this.anamneseForm = this.fb.group({
      'objetivo': [''],
      'casoClinico': [''],
      'refeicoesFora': ['B'],
      'apetite': ['B'],
      'fumante': ['true'],
      'bebidas': ['true'],
      'academia': ['true'],
      'atividadesFisicas': [''],
      'tempoDeSono': [''],
      'qualidadeDeSono': ['B'],
      'gestante': ['true'],
      'diabetes': ['true'],
      'alergias': [''],
      'sintomas': [''],
      'doencas': [''],
      'observacoes': [''],
      'quantidadeRefeicoes': [''],
      'suplementos': [''],
      'alimentosConsumidos': ['']
    });
  }

  public salvar(): void{
      //this.chamarPasso2.emit('passo2');
      console.log(this.anamneseForm.value);
      let model = this.anamneseForm.value;
      this._service.salvar(model).subscribe(
          res=>console.log(res)

      );
  }
}
