import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private colorFondo: string;
  private colorFuente: string;

  constructor() { 
    // Carga los colores desde localStorage o establece valores por defecto
    this.colorFondo = localStorage.getItem('colorFondo') || '#508aa8';
    this.colorFuente = localStorage.getItem('colorFuente') || '#031927';
  }

  setColorFondo(color: string) {
    this.colorFondo = color;
    localStorage.setItem('colorFondo', color);
  }

  setColorFuente(color: string) {
    this.colorFuente = color;
    localStorage.setItem('colorFuente', color);
  }

  getColorFondo(): string {
    return this.colorFondo;
  }

  getColorFuente(): string {
    return this.colorFuente;
  }
}
