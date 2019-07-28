import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';
import { AnamneseService } from './anamnese.service';
import { Paciente } from '../../paciente/Paciente.model';




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
                   }, 2000);


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
      'alimentosConsumidos': [''],
      'paciente': ['']
    });
  }

  buscarAnamnesePacienteEscolhido(): void{
      this._service.buscarPorId(this.idAnamnese)
          .subscribe(
              res=>{
                  console.log(res);
                },
              (erro)=>{
                console.log(erro);
              }
          )

  }

  public salvar(): void{
      let paciente = new Paciente();
      paciente = this.pacienteEscolhido;
      this.anamneseForm.get('paciente').setValue(paciente);
      console.log(this.anamneseForm.value);
      let model = this.anamneseForm.value;
      this._service.salvar(model).subscribe(
      );
  }
}
