import { Refeicao } from './refeicao.model';

export class PlanoAlimentar{

    public id: number;

    public paciente_id: number;

    public data_horario_cadastro: Date
    
    public nutricionista_id: number;

    public refeicoes: Refeicao[];

}