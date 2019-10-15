import { Anamnese } from '../models/anamnese.model';
import { Endereco } from '../models/endereco.model';
import { Usuario } from '../models/usuario.model';

export class Paciente{

    public id: Number;
	
	public nome: String;

	public genero: String;

    public dataNascimento: String;
    
	public celular: String;
	
	public email: String ;
	
	public isPaciente: boolean;
	
	public dataCadastro: Date;

	public anamnese: Anamnese;

	public endereco: Endereco;

	public usuario: Usuario;
	
    public nutricionista_id: number;
}