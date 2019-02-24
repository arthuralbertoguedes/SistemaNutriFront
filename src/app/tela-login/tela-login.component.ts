import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.css']
})
export class TelaLoginComponent implements OnInit {

  public formularioLogin : FormGroup = new FormGroup({
    'usuario': new FormControl('',[Validators.minLength(1), Validators.required]),
    'senha' : new FormControl('',[Validators.minLength(5), Validators.required])
  });

  constructor() { }

  ngOnInit() {
    console.log(this.formularioLogin);
  }


  

  autenticarUsuario() : void{
    console.log(this.formularioLogin);
  }

}
