import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  telefone?: string;
  endereco?: string;
  dataCadastro?: Date;
  ativo?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);

  constructor() {
    // Verificar se há usuário logado no localStorage
    const user = localStorage.getItem('currentUser');
    console.log('AuthService: Checking for existing user in localStorage', user);
    if (user) {
      const parsedUser = JSON.parse(user);
      this.currentUserSubject.next(parsedUser);
      this.loggedInSubject.next(true);
      console.log('AuthService: User found in localStorage, setting logged in state to true');
    } else {
      console.log('AuthService: No user found in localStorage, setting logged in state to false');
    }
    // Garante que usuários padrão existem no localStorage
    this.ensureDefaultUsers();
  }

  private ensureDefaultUsers() {
    const usuarios = localStorage.getItem('usuarios');
    if (!usuarios) {
      const defaultUsuarios = [
        { id: 1, nome: 'Admin', email: 'admin@email.com', senha: 'admin123', ativo: true },
        { id: 2, nome: 'Usuário', email: 'usuario@email.com', senha: '123456', ativo: true }
      ];
      localStorage.setItem('usuarios', JSON.stringify(defaultUsuarios));
    }
  }

  login(email: string, senha: string): Observable<boolean> {
    return new Observable(observer => {
      const usuarios = this.getUsuarios();
      const usuario = usuarios.find(u => u.email === email && u.senha === senha);
      if (usuario) {
        const userSemSenha = { ...usuario };
        delete userSemSenha.senha;
        localStorage.setItem('currentUser', JSON.stringify(userSemSenha));
        this.currentUserSubject.next(userSemSenha);
        this.loggedInSubject.next(true);
        console.log('AuthService: Login successful, setting logged in state to true');
        console.log('AuthService: Current loggedInSubject value after setting:', this.loggedInSubject.value);
        
        // Add a small delay to ensure state propagation
        setTimeout(() => {
          console.log('AuthService: After timeout, loggedInSubject value:', this.loggedInSubject.value);
          observer.next(true);
          observer.complete();
        }, 0);
      } else {
        console.log('AuthService: Login failed, invalid credentials');
        observer.next(false);
        observer.complete();
      }
    });
  }

  cadastrar(usuario: Usuario): Observable<boolean> {
    return new Observable(observer => {
      try {
        const usuarios = this.getUsuarios();
        if (usuarios.find(u => u.email === usuario.email)) {
          observer.next(false);
          observer.complete();
          return;
        }
        const novoUsuario = {
          ...usuario,
          id: Date.now(),
          dataCadastro: new Date(),
          ativo: true
        };
        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        observer.next(true);
      } catch (error) {
        observer.next(false);
      }
      observer.complete();
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.loggedInSubject.next(false);
    console.log('AuthService: Logout successful, setting logged in state to false');
  }

  isLoggedIn(): Observable<boolean> {
    console.log('AuthService: isLoggedIn() called, current value:', this.loggedInSubject.value);
    return this.loggedInSubject.asObservable();
  }

  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  private getUsuarios(): Usuario[] {
    const usuarios = localStorage.getItem('usuarios');
    if (!usuarios) {
      // Garante usuários padrão sempre
      this.ensureDefaultUsers();
      return [
        { id: 1, nome: 'Admin', email: 'admin@email.com', senha: 'admin123', ativo: true },
        { id: 2, nome: 'Usuário', email: 'usuario@email.com', senha: '123456', ativo: true }
      ];
    }
    return JSON.parse(usuarios);
  }
}