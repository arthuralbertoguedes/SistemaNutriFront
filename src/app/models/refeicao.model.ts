import { Alimento } from '../avaliacao/plano-alimentar/alimento.model';

export class Refeicao{

    public descricao: string;

    public horario: string;

    public tipoRefeicao: string;

    public alimentosRefeicao: Alimento[];

    public diaDaSemana: number[];
}