import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // 🔹 Asegura que inicie en login
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
        data: { roles: ['administradorWM'] } // Solo el superAdministradorWM puede acceder
      },
      {
        path: 'raciones',
        loadChildren: () => import('./modules/raciones/raciones.module').then(m => m.RacionesModule),
        canActivate: [AuthGuard],
        data: { roles: ['administradorWM', 'presidenteCAEC', 'tesoreroCAEC', 'presidenteCV'] } // Todos pueden acceder
      },
      {
        path: 'registro-compras',
        loadChildren: () => import('./modules/registro-compras/registro-compras.module').then(m => m.RegistroComprasModule),
        canActivate: [AuthGuard],
        data: { roles: ['administradorWM', 'presidenteCAEC', 'tesoreroCAEC', 'presidenteCV'] } // Todos pueden acceder
      },
    ]
  },
  { path: '**', redirectTo: '/login' } // 🔹 Redirige cualquier otra URL inválida a login
];
