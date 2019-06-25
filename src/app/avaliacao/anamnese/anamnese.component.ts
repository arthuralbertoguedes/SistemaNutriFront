import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';



@Component({
  selector: 'anamnese',
  templateUrl: './anamnese.component.html',
  styleUrls: ['./anamnese.component.css']
})
export class AnamneseComponent implements OnInit {

  public anamneseForm: FormGroup;
  @Output() chamarPasso2: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.anamneseForm = this.fb.group({
      'objetivo': [''],
      'casoClinico': [''],
      'refeicoesFora': ['B'],
      'apetite': ['B'],
      'fumante': ['S'],
      'bebidas': ['S'],
      'academia': ['S'],
      'atividadesFisicas': [''],
      'tempoDeSono': [''],
      'qualidadeSono': ['B'],
      'gestante': ['S'],
      'diabetes': ['S'],
      'alergias': [''],
      'sintomas': [''],
      'doencas': [''],
      'observacoes': ['']
    });
  }

  public salvar(): void{
      console.log(this.anamneseForm.value)
      this.chamarPasso2.emit('passo2');
  }
}
