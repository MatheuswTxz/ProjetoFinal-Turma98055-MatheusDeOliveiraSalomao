import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <nav class="navbar">
        <div class="nav-brand">
          <span class="brand-text"> A Esperança</span>
        </div>
        
        <ul class="nav-menu" [class.active]="menuOpen">
          <li class="nav-item">
            <a routerLink="/home" routerLinkActive="active" class="nav-link">HOME</a>
          </li>
          <li class="nav-item">
            <a routerLink="/sobre-nos" routerLinkActive="active" class="nav-link">SOBRE NÓS</a>
          </li>
          <li class="nav-item">
            <a routerLink="/contato" routerLinkActive="active" class="nav-link">CONTATO</a>
          </li>
          <li class="nav-item">
            <a routerLink="/doacao" routerLinkActive="active" class="nav-link">DOAÇÃO</a>
          </li>
        </ul>

        <div class="nav-auth">
          <button *ngIf="!isLoggedIn" routerLink="/login" class="btn-login">
            <span class="user-icon">👤</span>
            Login
          </button>
          <div *ngIf="isLoggedIn" class="user-menu">
            <span class="user-welcome">Bem-vindo, {{userName}}</span>
            <button (click)="logout()" class="btn-logout">Sair</button>
          </div>
        </div>

        <div class="hamburger" [class.active]="menuOpen" (click)="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      background: linear-gradient(135deg, #4ade80, #22c55e);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 5%;
      max-width: 1200px;
      margin: 0 auto;
    }
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .logo-header {
      height: 50px;
      width: auto;
      filter: brightness(0) invert(1);
    }
    .brand-text {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
    }
    .nav-menu {
      display: flex;
      list-style: none;
      gap: 2rem;
      margin: 0;
      padding: 0;
    }
    .nav-link {
      color: white;
      text-decoration: none;
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      transition: all 0.3s ease;
    }
    .nav-link:hover,
    .nav-link.active {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
    .nav-auth {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .btn-login {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: white;
      color: #22c55e;
      border: none;
      padding: 0.7rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
    }
    .btn-login:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    .user-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .user-welcome {
      color: white;
      font-weight: 500;
    }
    .btn-logout {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    .btn-logout:hover {
      background: white;
      color: #22c55e;
    }
    .hamburger {
      display: none;
      flex-direction: column;
      cursor: pointer;
      width: 25px;
      height: 20px;
    }
    .hamburger span {
      width: 100%;
      height: 3px;
      background: white;
      margin: 2px 0;
      transition: all 0.3s ease;
    }
    .hamburger.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }
    .hamburger.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
    @media (max-width: 768px) {
      .nav-menu {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background: linear-gradient(135deg, #4ade80, #22c55e);
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 2rem;
        transition: left 0.3s ease;
      }
      .nav-menu.active {
        left: 0;
      }
      .nav-item {
        margin: 1rem 0;
      }
      .nav-link {
        font-size: 1.2rem;
        padding: 1rem 2rem;
      }
      .hamburger {
        display: flex;
      }
      .nav-auth {
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1001;
      }
      .logo-header {
        height: 40px;
      }
      .brand-text {
        font-size: 1.2rem;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  isLoggedIn = false;
  userName = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        if (loggedIn) {
          this.userName = this.authService.getCurrentUser()?.nome || 'Usuário';
        }
      }
    );
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
    this.menuOpen = false;
  }
}
