import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent)
    },
    {
      path: 'login',
      loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)
    },
    {
      path: 'logout',
      loadComponent: () => import('./components/logout/logout.component').then(c => c.LogoutComponent)
    },
    {
      path: 'register',
      loadComponent: () => import('./components/register/register.component').then(c => c.RegisterComponent)
    },
    {
      path: 'forgot-password',
      loadComponent: () => import('./components/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent)
    },
    {
      path: 'reset-password',
      loadComponent: () => import('./components/reset-password/reset-password.component').then(c => c.ResetPasswordComponent)
    },
    {
      path: 'dashboard',
      loadComponent: () => import('./components/dashboard/dashboard.component').then(c => c.DashboardComponent)
    },
    {
      path: '**',
      redirectTo: 'error/404',
    }
  ];
  
  