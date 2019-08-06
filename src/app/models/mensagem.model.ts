import { Usuario } from './usuario.model';
import { Paciente } from '../paciente/Paciente.model';

export class Mensagem{

    public id: number;

    public mensagem: string;

    public horario: Date;

    public foiLida: boolean;

    public usuario: Usuario;

    public paciente: Paciente;

}