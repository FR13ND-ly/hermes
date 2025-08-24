import { Routes } from '@angular/router';
import { authenticatedGuard } from './core/guards/authenticated.guard';
import { logoutGuard } from './core/guards/logout.guard';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [authenticatedGuard] },
    { path: 'project/:project_id', loadChildren: () => import('./pages/project/project.module').then(m => m.ProjectModule), canActivate: [authenticatedGuard] },
    { path: 'create-project', loadComponent: () => import('./pages/create-project/create-project.component').then(m => m.CreateProjectComponent), canActivate: [authenticatedGuard] },
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), canActivate: [logoutGuard] },
    { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
