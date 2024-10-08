import { Component } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent],
})
export class HomePage {

  coloresClaros = ['#FC6A0F', '#508AA8', '#E0FF4F'];
  coloresOscuros = ['#031927', '#1C0D03', '#BA1200'];

  constructor(private router: Router, private colorService: ColorService) {}

  cambiarColor() {
    const ionContent = document.querySelector('ion-content');
    const h1 = document.querySelector('h1');
    const ionIcons = document.querySelectorAll('ion-icon');

    if (ionContent && h1) {
      const esFondoClaro = Math.random() > 0.5;
      const coloresFondoDisponibles = esFondoClaro 
        ? this.coloresClaros.filter(color => color !== this.colorService.getColorFondo()) 
        : this.coloresOscuros.filter(color => color !== this.colorService.getColorFondo());
      const coloresFuenteDisponibles = esFondoClaro 
        ? this.coloresOscuros.filter(color => color !== this.colorService.getColorFuente()) 
        : this.coloresClaros.filter(color => color !== this.colorService.getColorFuente());

      const colorFondoAleatorio = coloresFondoDisponibles[Math.floor(Math.random() * coloresFondoDisponibles.length)];
      const colorFuenteAleatorio = coloresFuenteDisponibles[Math.floor(Math.random() * coloresFuenteDisponibles.length)];

      ionContent.style.setProperty('--background', colorFondoAleatorio);
      h1.style.color = colorFuenteAleatorio;
      h1.style.display = 'block';
      ionIcons.forEach(icon => icon.style.color = colorFuenteAleatorio);

      // Guarda los colores en el servicio para compartirlos con otras páginas
      this.colorService.setColorFondo(colorFondoAleatorio);
      this.colorService.setColorFuente(colorFuenteAleatorio);
    }
  }

  irALobby() {
    this.router.navigate(['/lobby']);
  }

  irAInstrucciones() {
    this.router.navigate(['/instructions']);
  }

  irAConfiguracion() {
    this.router.navigate(['/settings']);
  }
}
