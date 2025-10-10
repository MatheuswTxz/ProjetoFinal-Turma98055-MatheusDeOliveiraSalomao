import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doacao.component.html',
  styleUrls: ['./doacao.component.css']
})
export class DoacaoComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  valor: number = 0;
  pagamento: string = 'pix';
  mensagem: string = '';
  private authSubscription: Subscription | undefined;

  valoresSugeridos = [
    { valor: 20, pagamento: 'pix' },
    { valor: 50, pagamento: 'boleto' },
    { valor: 100, pagamento: 'cartao' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Check current auth state immediately
    this.checkAuthState();
    
    // Subscribe to auth state changes
    this.authSubscription = this.authService.isLoggedIn().subscribe(isLoggedIn => {
      console.log('DoacaoComponent: isLoggedIn status changed to', isLoggedIn);
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private checkAuthState() {
    // Check the current auth state immediately when component initializes
    const currentUser = this.authService.getCurrentUser();
    this.isLoggedIn = !!currentUser;
    console.log('DoacaoComponent: Initial auth state check, isLoggedIn:', this.isLoggedIn);
  }

  doarRapido(valor: number, pagamento: string) {
    this.mensagem = `Doação de R$${valor} via ${pagamento} realizada!`;
  }

  onSubmit() {
    this.mensagem = `Doação de R$${this.valor} via ${this.pagamento} realizada!`;
  }
}