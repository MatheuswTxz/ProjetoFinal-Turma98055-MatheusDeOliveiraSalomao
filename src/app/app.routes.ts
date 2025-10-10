import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SobreNosComponent } from './components/sobre-nos/sobre-nos.component';
import { ContatoComponent } from './components/contato/contato.component';
import { DoacaoComponent } from './components/doacao/doacao.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sobre-nos', component: SobreNosComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'doacao', component: DoacaoComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] }, // acesso só com admin
  { path: '**', redirectTo: '' }
];
