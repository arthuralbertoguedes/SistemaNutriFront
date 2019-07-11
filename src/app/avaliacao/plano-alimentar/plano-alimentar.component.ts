import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Alimento } from './alimento.model';
import { PlanoAlimentarService } from './plano-alimentar.service';
import { SelectItem } from '../../../../node_modules/primeng/api';
import { ItemPlanoAlimentar } from '../../models/itemPlanoAlimentar.model';

@Component({
  selector: 'plano-alimentar',
  templateUrl: './plano-alimentar.component.html',
  styleUrls: ['./plano-alimentar.component.css']
})
export class PlanoAlimentarComponent implements OnInit {

  public planoAlimentarForm: FormGroup;

  public alimentosRetornados: Alimento[];

  public diasDaSemana: SelectItem[];

  public diasDaSemanaSelecionados: string[] = [];

  public itensPlanoAlimentar: any[] = [];

  public alimentoSelecionado: Alimento;

  public mostrarSecaoAdicionarAlimentos: boolean = false;
 
  constructor(private fb: FormBuilder,
              private _service: PlanoAlimentarService) { 
                  
       this.inicializarDiasDaSemana();

  }

  ngOnInit() {

      this.planoAlimentarForm = this.fb.group({
         'alimentos':[''],
         'quantidade': [''],
         'medida': [''],
         'diasDaSemanaSelecionados': [''],
         'horarioRefeicao': ['']
      })

  }

  adicionarAlimento(event) : void{
      console.log(event)
      this.alimentoSelecionado = event;
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

  adicionarNovaRefeicao(){
      this.mostrarSecaoAdicionarAlimentos = true;
  }
  adicionarItemPlanoAlimentar(): void{

        //Verificar se alimento já está na lista
        //implementar aqui
        this.itensPlanoAlimentar.forEach(element=>{
            console.log(element);
        });

        let novoItemPlanoAlimentar = new ItemPlanoAlimentar();
        novoItemPlanoAlimentar.alimento       = this.alimentoSelecionado.descricao;
        novoItemPlanoAlimentar.idAlimento     = this.alimentoSelecionado.id;
        novoItemPlanoAlimentar.calorias       = this.alimentoSelecionado.energia;
        novoItemPlanoAlimentar.carboidratos   = this.alimentoSelecionado.carboidrato;
        novoItemPlanoAlimentar.lipideos       = this.alimentoSelecionado.lipideos;
        novoItemPlanoAlimentar.medida         = (<HTMLInputElement>document.getElementById('medida')).value;
        novoItemPlanoAlimentar.proteinas      = this.alimentoSelecionado.proteina;
        novoItemPlanoAlimentar.quantidade     = this.planoAlimentarForm.get('quantidade').value;
        novoItemPlanoAlimentar.vitaminas      = this.alimentoSelecionado.vitamina; 
        novoItemPlanoAlimentar.sodio          = this.alimentoSelecionado.sodio; 
        
        //Pegando apenas horário do date
        let horarioSemFormatacao: Date        = this.planoAlimentarForm.get('horarioRefeicao').value;
        let horaDaRefeicao = horarioSemFormatacao.getHours() 
                                + ":" + horarioSemFormatacao.getMinutes()
                                         + horarioSemFormatacao.getSeconds();

        novoItemPlanoAlimentar.horario = horaDaRefeicao.toString().substring(0,5);
        
        this.itensPlanoAlimentar.push(novoItemPlanoAlimentar);
        console.log(this.itensPlanoAlimentar);

        //Reset formulário
        (<HTMLInputElement>document.getElementById('medida')).value = "";
        this.planoAlimentarForm.get('quantidade').reset();
        this.planoAlimentarForm.get('alimento').reset();
        this.planoAlimentarForm.get('medida').reset();
        this.planoAlimentarForm.get('horarioRefeicao').reset();
        this.alimentoSelecionado = null;

    }

  inicializarDiasDaSemana(): void{
        this.diasDaSemana = [];
        this.diasDaSemana.push({label:'Domingo', value:'domingo'});
        this.diasDaSemana.push({label:'Segunda', value:'segunda'});
        this.diasDaSemana.push({label:'Terça', value:'terça'});
        this.diasDaSemana.push({label:'Quarta ', value:'quarta'});
        this.diasDaSemana.push({label:'Quinta', value:'quinta'});
        this.diasDaSemana.push({label:'Sexta', value:'sexta'});
        this.diasDaSemana.push({label:'Sabado', value:'sabado'});
  }

}
