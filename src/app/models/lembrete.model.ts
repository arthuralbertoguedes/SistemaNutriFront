export class Lembrete{
    id: Number;

    lembrete: string;

    dataLembrete: Date;

    constructor(lembrete?: string){
        this.lembrete = lembrete;
    }
}