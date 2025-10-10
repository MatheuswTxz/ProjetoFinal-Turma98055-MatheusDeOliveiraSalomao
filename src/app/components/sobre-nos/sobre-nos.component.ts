import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre-nos',
  templateUrl: './sobre-nos.component.html',
  styleUrl: './sobre-nos.component.css'
})
export class SobreNosComponent {
  equipe = [
    { nome: 'Maria', cargo: 'Coordenadora', emoji: '👩‍💼' },
    { nome: 'João', cargo: 'Voluntário', emoji: '👨‍💼' },
    { nome: 'Ana', cargo: 'Assistente Social', emoji: '👩‍⚕️' }
  ];
}
