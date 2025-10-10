import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sobre-nos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre-nos.component.html',
  styleUrl: './sobre-nos.component.css'
})
export class SobreNosComponent {
  equipe = [
    { nome: 'Maria', cargo: 'Coordenadora', icon: 'fas fa-user-tie' },
    { nome: 'João', cargo: 'Voluntário', icon: 'fas fa-user-tie' },
    { nome: 'Ana', cargo: 'Assistente Social', icon: 'fas fa-user-md' }
  ];
}