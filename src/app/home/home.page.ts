import { Component } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router'; // Asegúrate de importar Router
import { ColorService } from '../services/color.service'; // Asegúrate de la ruta correcta

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent],
})
export class HomePage {
  // Listas de colores claros y oscuros
  coloresClaros = ['#FC6A0F', '#508AA8', '#E0FF4F'];
  coloresOscuros = ['#031927', '#1C0D03', '#BA1200'];

  // Últimos colores seleccionados
  ultimoColorFondo = '';
  ultimoColorFuente = '';

  constructor(private router: Router, private colorService: ColorService) {} // Inyecta el Router y ColorService

  cambiarColor() {
    const ionContent = document.querySelector('ion-content');
    const h1 = document.querySelector('h1');
    const ionIcons = document.querySelectorAll('ion-icon'); // Selecciona todos los iconos

    if (ionContent && h1) {
      let colorFondoAleatorio: string;
      let colorFuenteAleatorio: string;

      // Determinar si el nuevo fondo será claro u oscuro
      const esFondoClaro = Math.random() > 0.5;
      const coloresFondoDisponibles = esFondoClaro ? this.coloresClaros : this.coloresOscuros;
      const coloresFuenteDisponibles = esFondoClaro ? this.coloresOscuros : this.coloresClaros;

      // Seleccionar color de fondo sin repetir el último
      do {
        colorFondoAleatorio = coloresFondoDisponibles[Math.floor(Math.random() * coloresFondoDisponibles.length)];
      } while (colorFondoAleatorio === this.ultimoColorFondo);

      // Seleccionar color de fuente sin repetir el último
      do {
        colorFuenteAleatorio = coloresFuenteDisponibles[Math.floor(Math.random() * coloresFuenteDisponibles.length)];
      } while (colorFuenteAleatorio === this.ultimoColorFuente);

      // Aplicar los colores y actualizar los últimos colores seleccionados
      ionContent.style.setProperty('--background', colorFondoAleatorio);
      h1.style.color = colorFuenteAleatorio;
      h1.style.display = 'block';

      // Cambiar el color de todos los iconos
      ionIcons.forEach((icon) => {
        icon.style.color = colorFuenteAleatorio; // Aplica el nuevo color a cada icono
      });

      // Guardar los colores en el servicio
      this.colorService.setColorFondo(colorFondoAleatorio);
      this.colorService.setColorFuente(colorFuenteAleatorio);

      this.ultimoColorFondo = colorFondoAleatorio;
      this.ultimoColorFuente = colorFuenteAleatorio;
    }
  }

  irALobby() {
    this.router.navigate(['/lobby']); // Cambia la ruta según tu configuración
  }

  irAInstrucciones() {
    this.router.navigate(['/instructions']); // Cambia la ruta según tu configuración
  }

  irAConfiguracion() {
    this.router.navigate(['/settings']); // Cambia la ruta según tu configuración
  }
}
