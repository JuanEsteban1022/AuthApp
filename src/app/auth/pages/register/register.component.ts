import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {
  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.email]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  crearUsuario() {
    const { name, email, password } = this.miFormulario.value;
    this.authService.registro(name, email, password)
      .subscribe(ok => {
        console.log(ok);
        if (ok === true) {
          this.router.navigateByUrl('/dashboard');
        } else {
          // TODO: mostrar mensaje de error
          Swal.fire('Error', ok, 'error')
        }
      })
  }

}
