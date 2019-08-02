import { Component, OnInit } from '@angular/core';
import { tradutorCalendario } from '../../shared/tradutor-calendario';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { LembretesService } from '../lembretes.service';
import { Lembrete } from '../../models/lembrete.model';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-novo-lembrete',
  templateUrl: './novo-lembrete.component.html',
  styleUrls: ['./novo-lembrete.component.css']
})
export class NovoLembreteComponent implements OnInit {

  public ptbr: any;
  public novoLembreteForm: FormGroup;

  constructor(private fb: FormBuilder,
              private _lembreteService: LembretesService,
              private route: Router) { }

  

  ngOnInit() {
      //Importando tradução do calendário da pasta shared
      this.ptbr = tradutorCalendario;

      this.novoLembreteForm = this.fb.group(
        {
          'id': [''],
          'lembrete': ['', [Validators.required]],
          'dataLembrete': ['', [Validators.required]]
        }
      );
  }

  salvar(): void{
      let model = new Lembrete();
      model = this.novoLembreteForm.value;
      this._lembreteService.salvar(model)
        .subscribe(res =>{
            alert('salvou');
            console.log(res);
        })
  }

  voltar(): void{
      this.route.navigate(['home/lembretes']);
  }
}
