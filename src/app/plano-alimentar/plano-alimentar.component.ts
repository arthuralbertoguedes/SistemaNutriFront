import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../node_modules/@angular/forms';
import { Alimento } from './alimento.model';
import { PlanoAlimentarService } from './plano-alimentar.service';
import { SelectItem, MessageService } from '../../../node_modules/primeng/api';
import { ItemPlanoAlimentar } from '../models/itemPlanoAlimentar.model';
import { Refeicao } from '../models/refeicao.model';
import { ItemRefeicao } from '../models/item-refeicao.model';
import { PlanoAlimentar } from '../models/plano-alimentar.model';
import { isHitsEqual } from '@fullcalendar/interaction/interactions/HitDragging';

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

  public horarioRefeicaoSelecionado: string;

  public tipoRefeicaoSelecionado: string;
 
  public mostrarSecaoNovaRefeicao: boolean = true;

  public listaAlimentosRefeicao: Alimento[] = [];

  public observacoesRefeicaoSelecionada: string;

  public listaRefeicoes: Refeicao[] = [];

  public itensRefeicao: ItemRefeicao[] = [];

  @Input() public pacienteEscolhido: any;

  constructor(private fb: FormBuilder,
              private _service: PlanoAlimentarService,
              private _messageService: MessageService) { 
                  
       this.inicializarDiasDaSemana();

  }

  ngOnInit() {

      this.planoAlimentarForm = this.fb.group({
         'alimentos':[''],
         'quantidade': [''],
         'medida': [''],
         'diasDaSemanaSelecionados': [''],
         'horarioRefeicao': [''],
         'observacaoRefeicao': ['']
      })

  }

  adicionarAlimento(event) : void{
      this.alimentoSelecionado = event;
  } 

  buscarAlimentos(pesquisa) : void{
      this._service.listarAlimentos(pesquisa.query)
          .subscribe( 
                (res: any) => {
                    this.alimentosRetornados = res as Alimento[];
                    this.alimentosRetornados.forEach(
                        alimento => {
                            if(alimento.descricao_preparacao != 'NAO SE APLICA')
                                alimento.descricao += ' ' + alimento.descricao_preparacao;
                        }
                    );
                },
                erro => {
                }
          );
  }

  adicionarNovaRefeicao(){
      this.mostrarSecaoNovaRefeicao       = false;
      this.mostrarSecaoAdicionarAlimentos = true;
      this.horarioRefeicaoSelecionado     = this.getHorario(this.planoAlimentarForm.get('horarioRefeicao').value);
      this.tipoRefeicaoSelecionado        = (<HTMLInputElement>document.getElementById('tipoRefeicao')).value;
      this.observacoesRefeicaoSelecionada = this.planoAlimentarForm.get('observacaoRefeicao').value;
   }

   adicionarItemPlanoAlimentar(): void{

        //Adiciona o id do alimento na lista que será adicionada na refeição após clicar em adicionar refeição
        
        let itemRefeicao =  new ItemRefeicao();
        itemRefeicao.alimento_id = this.alimentoSelecionado.id;
        itemRefeicao.quantidade = this.planoAlimentarForm.get('quantidade').value + ' ' + ( <HTMLInputElement> document.getElementById('medida')).value;
        this.itensRefeicao.push(itemRefeicao);
        console.log(this.itensRefeicao);
        /*Adiciona alimento a lista/tabela*/
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
        
        /*Adiciona alimento para a lista que vai para o banco de dados */
        this.listaAlimentosRefeicao.push(this.alimentoSelecionado);

        /*Adiciona item para a lista que só sera exibida na tabela*/ 
        this.itensPlanoAlimentar.push(novoItemPlanoAlimentar);

        //Reset preenchimento de alimento
        (<HTMLInputElement>document.getElementById('medida')).value = "";
        this.planoAlimentarForm.get('quantidade').reset();
        this.planoAlimentarForm.get('alimentos').reset();
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

  /*Retira o horario do tipo Date*/
  public getHorario(dataCompleta: Date): string{
    let horarioSemFormatacao: Date        = dataCompleta;
    let horaDaRefeicao: string = horarioSemFormatacao.getHours() 
                                    + ":" + horarioSemFormatacao.getMinutes()
                                            + horarioSemFormatacao.getSeconds();
                                     
    return horaDaRefeicao.toString().substring(0,5); 
  }

  adicionarRefeicao(): void{  
      /*Adicionando refeição para salvar no banco de dados*/
      let refeicao = new Refeicao();
      refeicao.descricao         = this.observacoesRefeicaoSelecionada;
      refeicao.horario           = this.horarioRefeicaoSelecionado;
      refeicao.alimentosRefeicao = this.listaAlimentosRefeicao;
      refeicao.tipoRefeicao      = this.tipoRefeicaoSelecionado;
      refeicao.itensRefeicao     = this.itensRefeicao;
      
      this.listaRefeicoes.push(refeicao);
      console.log(this.listaRefeicoes)
      /*resets*/
      this.planoAlimentarForm.get('observacaoRefeicao').reset();
      this.planoAlimentarForm.get('horarioRefeicao').reset();
      this.mostrarSecaoNovaRefeicao       = true;
      this.mostrarSecaoAdicionarAlimentos = false;
      this.itensPlanoAlimentar            = [];
      this.listaAlimentosRefeicao         = [];
      this.itensRefeicao                  = [];
  }


    public salvar(): void{
        let refeicao = new Refeicao();
        let planoAlimentar = new PlanoAlimentar();

        //Setando o nutricionista
        let nutricionista_id = Number(localStorage.getItem("usuario_id"));

        planoAlimentar.paciente_id = this.pacienteEscolhido.id;
        planoAlimentar.data_horario_cadastro = new Date();
        planoAlimentar.nutricionista_id = nutricionista_id;



        planoAlimentar.refeicoes = this.listaRefeicoes;

        this._service.salvar(planoAlimentar)
            .subscribe(
                res => {
                    this.listaRefeicoes = [];
                    this.mostrarMensagemSucesso();
                },
                erro => {
                    this.mostrarMensagemErro();
                }
            );

    }


    mostrarMensagemSucesso(): void {
        this._messageService.add({severity:'success', summary:'Plano Alimentar cadastrado com sucesso!'});
          this.limparMensagem();
      }
    
      mostrarMensagemErro(): void {
          this._messageService.add({severity:'error', summary:'Ops! Algum problema aconteceu!'});
          this.limparMensagem();
      }
    
      limparMensagem(): void{
          setTimeout(()=>{
              this._messageService.clear();
          },4000);
      }
}
