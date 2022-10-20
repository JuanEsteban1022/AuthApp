import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      * {
        margin: 15px;
      }

      .boton {
        border: 1px solid #2e518b; /*anchura, estilo y color borde*/
        padding: 10px; /*espacio alrededor texto*/
        background-color: #2e518b; /*color botón*/
        color: #ffffff; /*color texto*/
        text-transform: uppercase; /*capitalización texto*/
        border-radius: 10px; /*bordes redondos*/
      }
    `,
  ],
})
export class DashboardComponent {

  constructor(private router: Router, private authService: AuthService) { }

  get usuario() {
    return this.authService.usuario;
  }

  logout() {
    this.router.navigateByUrl('/auth/login');
    this.authService.logout();
  }
}
