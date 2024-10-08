import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Esto asegura que el servicio sea singleton y disponible en toda la aplicación
})
export class ColorService {
  private colorFondo = '#508aa8'; // Color de fondo por defecto
  private colorFuente = '#031927'; // Color de fuente por defecto

  constructor() { }

  setColorFondo(color: string) {
    this.colorFondo = color;
  }

  setColorFuente(color: string) {
    this.colorFuente = color;
  }

  getColorFondo(): string {
    return this.colorFondo;
  }

  getColorFuente(): string {
    return this.colorFuente;
  }
}
