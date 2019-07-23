import { Paciente } from '../paciente/Paciente.model';

export class Consulta{

    public id                       : Number;
    public dataConsulta             : Date;
    public horarioInicio            : Date;
    public horarioFim               : Date;
    public informacoesAdicionais    : String;
    public horarioDateTime          : Date;
    public paciente                 : Paciente;
}