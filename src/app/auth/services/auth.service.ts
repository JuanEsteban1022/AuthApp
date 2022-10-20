import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, usuario } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl: string = environment.baseUrl;
  private _usuario!: usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }

  registro(name: string, email: string, password: string) {
    const url = `${this._baseUrl}/auth/new`;
    const body = { name, email, password };
    // Se retorna para realizar la subscripción donde se llama el metodo login
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          console.log(resp);
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  login(email: string, password: string) {
    const url = `${this._baseUrl}/auth`;
    const body = { email, password };
    // Se retorna para realizar la subscripción donde se llama el metodo login
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          console.log(resp);
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  validarToken(): Observable<boolean> {
    const url = `${this._baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');
    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!,
          }
          return resp.ok;
        }),
        catchError(err => of(false))
      );
  }

  logout() {
    localStorage.clear();
  }
}
