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
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
      this.loggedInSubject.next(true);
    }
  }

  login(email: string, senha: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulação de login - em produção, fazer chamada para API
      const usuarios = this.getUsuarios();
      const usuario = usuarios.find(u => u.email === email && u.senha === senha);
      
      if (usuario) {
        const userSemSenha = { ...usuario };
        delete userSemSenha.senha;
        
        localStorage.setItem('currentUser', JSON.stringify(userSemSenha));
        this.currentUserSubject.next(userSemSenha);
        this.loggedInSubject.next(true);
        
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }

  cadastrar(usuario: Usuario): Observable<boolean> {
    return new Observable(observer => {
      try {
        const usuarios = this.getUsuarios();
        
        // Verificar se email já existe
        if (usuarios.find(u => u.email === usuario.email)) {
          observer.next(false);
          observer.complete();
          return;
        }
        
        // Adicionar novo usuário
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
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  private getUsuarios(): Usuario[] {
    const usuarios = localStorage.getItem('usuarios');
    return usuarios ? JSON.parse(usuarios) : [];
  }
}
