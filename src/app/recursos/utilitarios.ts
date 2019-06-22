export class Utilitarios{

    public static getDataAtual(): Date{
        let hoje = new Date();
        return hoje;
    }

    public static gerarData(data : String): Date{
        let dia = Number(data.substring(0,2));
        let mes = Number(data.substring(3,5));
        let ano = Number(data.substring(6,10));
        return new Date(ano,mes,dia)
    }

    public static pegarHorarioData(data: String): String{
        let horario = data.substring(16,21);
        return horario;
    }
}