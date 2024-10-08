import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'lobby',
    loadComponent: () => import('./pages/lobby/lobby.page').then( m => m.LobbyPage)
  },
  {
    path: 'game',
    loadComponent: () => import('./pages/game/game.page').then( m => m.GamePage)
  },
  {
    path: 'instructions',
    loadComponent: () => import('./pages/instructions/instructions.page').then( m => m.InstructionsPage)
  },
];
