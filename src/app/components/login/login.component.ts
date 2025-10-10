import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, Usuario } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  lgpdAceito: boolean = false;
  mensagem: string = '';
  warnLgpd: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.warnLgpd = false;
    this.mensagem = '';

    if (!this.lgpdAceito) {
      this.warnLgpd = true;
      return;
    }

    console.log('LoginComponent: Attempting login with email', this.email, 'and password', this.senha);
    
    this.authService.login(this.email.trim(), this.senha).subscribe((isLoggedIn: boolean) => {
      console.log('LoginComponent: Login result', isLoggedIn);
      if (isLoggedIn) {
        // Get current user to determine if admin
        const currentUser = this.authService.getCurrentUser();
        console.log('LoginComponent: Current user', currentUser);
        if (currentUser) {
          // Check if user is admin based on email
          if (currentUser.email === 'admin@email.com') {
            this.mensagem = 'Login de admin realizado!';
            console.log('LoginComponent: Redirecting admin user to /admin');
            this.router.navigate(['/admin']);
          } else {
            // Usuário comum
            this.mensagem = 'Login realizado com sucesso!';
            console.log('LoginComponent: Redirecting regular user to /doacao');
            this.router.navigate(['/doacao']);
          }
        } else {
          // Fallback if currentUser is null
          this.mensagem = 'Login realizado com sucesso!';
          console.log('LoginComponent: Redirecting user (fallback) to /doacao');
          this.router.navigate(['/doacao']);
        }
      } else {
        this.mensagem = 'Credenciais inválidas.';
        console.log('LoginComponent: Invalid credentials');
      }
    });
  }
}