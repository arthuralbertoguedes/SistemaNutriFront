import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '../../../node_modules/@angular/router';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, routeState: RouterStateSnapshot): boolean{

      let token       = localStorage.getItem("token");
      let usuarioId   = localStorage.getItem("usuario_id");
      let usuarioNome = localStorage.getItem("usuario_nome");

      if(token != null && usuarioId != null && usuarioNome != null)
          return true;
      else{
          this.router.navigate(['/login']);
          return false;
      }         
  }
  
}
