import { Injectable } from '@angular/core';
import { CanActivate, Router } from '../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{
 
  

  constructor(private router : Router) { }

  canActivate(){
   
      if(localStorage.getItem('token')=='123123123'){
          
          return true;
      }    
      else{  
          this.router.navigate(['/login']);
          return false;
      }        
  }
}

