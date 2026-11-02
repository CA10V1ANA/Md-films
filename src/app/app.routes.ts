import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    title: 'Madu Films | Histórias que merecem ser revividas',
    loadComponent: () => import('./pages/home').then((m) => m.Home),
  },
  {
    path: 'portfolio',
    title: 'Portfólio | Madu Films',
    loadComponent: () => import('./pages/portfolio').then((m) => m.Portfolio),
  },
  {
    path: 'portfolio/:id',
    title: 'Projeto | Madu Films',
    loadComponent: () => import('./pages/project').then((m) => m.ProjectPage),
  },
  {
    path: 'pacotes',
    title: 'Pacotes | Madu Films',
    loadComponent: () => import('./pages/packages').then((m) => m.PackagesPage),
  },
  {
    path: 'orcamento',
    title: 'Orçamento | Madu Films',
    loadComponent: () => import('./pages/quote').then((m) => m.QuotePage),
  },
  {
    path: '**',
    title: 'Página não encontrada | Madu Films',
    loadComponent: () => import('./pages/not-found').then((m) => m.NotFound),
  },
];
