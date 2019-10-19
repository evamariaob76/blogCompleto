import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios-login/usuario';
import swal from 'sweetalert2';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios-login',
  templateUrl: './usuarios-login.component.html',
  styleUrls: ['./usuarios-login.component.css']
})
export class UsuariosLoginComponent implements OnInit {
  titulo: string= "logearse";
  usuario : Usuario;
  constructor( private authService: AutenticacionService,
               private router: Router)
  {
    this.usuario = new Usuario();
   }

  ngOnInit() {
if(this.authService.isAuthenticated()){
  swal.fire('Login', `Hola ${this.authService.usuario.username}`, 'info');
}

  }
  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
     let usuario = this.authService.usuario;      this.router.navigate(['/admin']);

      swal.fire('Login', `Holas ${usuario.username}, has iniciado sesión con éxito!`, 'success');

    }, err => {
      if (err.status == 400) {
        swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    }
    );
  }

 cerrarSesion() :void{

    this.authService.logout();

    }
    VerSuscriptores(){
      this.router.navigate(['/clientes/page/0']);
    
    }
    
    VerLikes(){
      this.router.navigate(['/likes']);
    
    }
}
