import { Component, OnInit } from '@angular/core';
import { LembretesService } from './lembretes.service';
import { tradutorCalendario } from '../shared/tradutor-calendario';
import { Lembrete } from '../models/lembrete.model';

@Component({
  selector: 'app-lembretes',
  templateUrl: './lembretes.component.html',
  styleUrls: ['./lembretes.component.css']
})
export class LembretesComponent implements OnInit {
 
  public ptbr: any;
  public dataLembrete: Date = new Date();
  public lembretes: Lembrete[] = [];

  constructor(private _service: LembretesService) { }

  ngOnInit() {
      this.inicializarDataLembrete();
      this.ptbr = tradutorCalendario;
  }

  buscarLembretes(): void{
      console.log(this.dataLembrete)
      this._service.buscarLembretesDia(this.dataLembrete)
        .subscribe(res => {
            this.lembretes = res as Lembrete[];
        })
  }

  inicializarDataLembrete(): void{
      this.dataLembrete.setMinutes(0);
      this.dataLembrete.setHours(0);
      this.dataLembrete.setMilliseconds(0);
      this.dataLembrete.setSeconds(0);
  }

}
