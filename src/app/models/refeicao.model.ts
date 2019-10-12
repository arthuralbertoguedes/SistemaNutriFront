import { Alimento } from '../plano-alimentar/alimento.model';
import { PlanoAlimentar } from './plano-alimentar.model';
import { ItemRefeicao } from './item-refeicao.model';


export class Refeicao{

    public id: number;

    public planoAlimentar: PlanoAlimentar

    public descricao: string;

    public horario: string;

    public observacoes: string;

    public alimentosRefeicao: Alimento[];

    public tipoRefeicao: string;

    public itensRefeicao: ItemRefeicao[];

}