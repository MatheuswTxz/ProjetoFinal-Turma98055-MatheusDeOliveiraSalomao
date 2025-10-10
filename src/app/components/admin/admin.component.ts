import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- IMPORTANTE

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule], // <-- ADICIONE AQUI NO DECORATOR!
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  users = [
    { nome: 'João', email: 'joao@email.com', doou: true, valor: 50 },
    { nome: 'Maria', email: 'maria@email.com', doou: false },
    { nome: 'Ana', email: 'ana@email.com', doou: true, valor: 20 }
  ];
}

