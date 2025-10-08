import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>ONG A Esperança</h3>
          <p>Transformando vidas através da solidariedade e esperança.</p>
        </div>
        <div class="footer-section">
          <h3>Contato</h3>
          <p><i class="fa-solid fa-envelope" style="color: #f9fafb;"></i> contato&#64;esperanca.org.br</p>
          <p><i class="fa-solid fa-phone" style="color: #f0f0f0;"></i> (71) 98722-3798</p>
        </div>
        <div class="footer-section">
          <h3>Siga-nos</h3>
          <div class="social-links">
            <span><i class="fa-brands fa-instagram" style="color: #fafafa;"></i> Instagram</span>
            <span><i class="fa-brands fa-facebook" style="color: #fafafa;"></i> Facebook</span>
            <span><i class="fa-brands fa-whatsapp" style="color: #fafafa;"></i> WhatsApp</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 ONG A Esperança. Todos os direitos reservados.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1f2937;
      color: white;
      margin-top: auto;
    }
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    .footer-section h3 {
      margin-bottom: 1rem;
      color: #22c55e;
    }
    .footer-section p {
      margin-bottom: 0.5rem;
      color: #d1d5db;
    }
    .social-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .social-links span {
      cursor: pointer;
      transition: color 0.3s ease;
    }
    .social-links span:hover {
      color: #22c55e;
    }
    .footer-bottom {
      border-top: 1px solid #374151;
      padding: 1rem 2rem;
      text-align: center;
      color: #9ca3af;
    }
  `]
})
export class FooterComponent { }
