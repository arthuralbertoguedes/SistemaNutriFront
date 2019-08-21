import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';
import { AnamneseService } from './anamnese.service';
import { Paciente } from '../../paciente/Paciente.model';
import { Anamnese } from '../../models/anamnese.model';




@Component({
  selector: 'anamnese',
  templateUrl: './anamnese.component.html',
  styleUrls: ['./anamnese.component.css']
})
export class AnamneseComponent implements OnInit {

  public anamneseForm: FormGroup;
  @Output() chamarAnamnese: EventEmitter<string> = new EventEmitter();

  //Varíavel que recebe o id do paciente escolhido do componente pai
  @Input() pacienteEscolhido: Paciente;

  //Apenas para recuperar as informações das anamneses
  public idAnamnese               : Number;
  public anamnesePacienteEscolhido: Object;

  constructor(private fb: FormBuilder,
              private _service: AnamneseService) { }

  ngOnInit() {

    // Quando tiver carregado o paciente no componente pai
    // limpa o interval
    let interval = setInterval(()=>{
                      if(this.pacienteEscolhido!=undefined){
                          this.idAnamnese = this.pacienteEscolhido.id;
                          this.buscarAnamnesePacienteEscolhido();
                          clearInterval(interval);
                      }     
                   }, 500);


    this.anamneseForm = this.fb.group({
      'id': [''],
      'objetivo': [''],
      'casoClinico': [''],
      'refeicoesFora': ['B'],
      'apetite': ['B'],
      'fumante': ['S'],
      'bebidas': ['S'],
      'academia': ['S'],
      'atividadesFisicas': [''],
      'tempoDeSono': [''],
      'qualidadeDeSono': ['B'],
      'gestante': ['S'],
      'diabetes': ['S'],
      'alergias': [''],
      'sintomas': [''],
      'doencas': [''],
      'observacoes': [''],
      'quantidadeRefeicoes': [''],
      'suplementos': [''],
      'alimentosConsumidos': [''],
      'paciente': ['']
    });
  }

  buscarAnamnesePacienteEscolhido(): void{
      this._service.buscarPorId(this.idAnamnese)
          .subscribe(
              res=>{
                  this.setarAnamnesePaciente(res as Anamnese);
                }
          )

  }

  public salvar(): void{
      let paciente = new Paciente();
      paciente = this.pacienteEscolhido;
      this.anamneseForm.get('paciente').setValue(paciente);
      let model = this.anamneseForm.value;
      this._service.salvar(model).subscribe(
      );
  }

  setarAnamnesePaciente(anamnese: Anamnese): void{
      try{
        this.anamneseForm.patchValue(anamnese);
      }
      catch(e){}
  }
}
