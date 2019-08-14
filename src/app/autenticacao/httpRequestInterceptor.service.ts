import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Injectable } from '../../../node_modules/@angular/core';

/* Classe que intercepta qualquer requisição Http realizada para a API */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor{

    private token: string;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /* Recupera o token do LocalStorage*/
        this.token = localStorage.getItem("token");
        /* Clona a requisição para adicionar o token de autorização*/
  
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.token}`
            }
        });
        /* Envia a requisição com o header */
        return next.handle(request);
    }
}