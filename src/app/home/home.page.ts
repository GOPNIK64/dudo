import { Component } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent],
})
export class HomePage {
  // Lista de colores para el fondo y la fuente
  coloresFondo = ['#FC6A0F', '#508AA8', '#031927', '#BA1200', '#1C0D03'];
  coloresFuente = ['#FC6A0F', '#508AA8', '#031927', '#BA1200', '#1C0D03'];

  // Cambiar el color de fondo y de la fuente al tocar el título
  cambiarColor() {
    const ionContent = document.querySelector('ion-content');
    const h1 = document.querySelector('h1');

    if (ionContent && h1) {
      // Seleccionar un color aleatorio para el fondo
      const colorFondoAleatorio = this.coloresFondo[Math.floor(Math.random() * this.coloresFondo.length)];
      let colorFuenteAleatorio = this.coloresFuente[Math.floor(Math.random() * this.coloresFuente.length)];

      while (colorFondoAleatorio === colorFuenteAleatorio) {
        colorFuenteAleatorio = this.coloresFuente[Math.floor(Math.random() * this.coloresFuente.length)];
      }

      ionContent.style.setProperty('--background', colorFondoAleatorio);
      h1.style.color = colorFuenteAleatorio;
      h1.style.display = 'block';

      if (colorFondoAleatorio === colorFuenteAleatorio) {
        h1.style.display = 'none';
      }
    }
  }

  // Métodos para la navegación (puedes implementar la lógica según tu aplicación)
  irALobby() {
    console.log('Ir al Lobby');
    // Aquí puedes agregar la lógica para ir a la pantalla de Lobby
  }

  irAConfiguracion() {
    console.log('Ir a Configuración');
    // Aquí puedes agregar la lógica para ir a la pantalla de Configuración
  }

  irAInstrucciones() {
    console.log('Ir a Instrucciones');
    // Aquí puedes agregar la lógica para ir a la pantalla de Instrucciones
  }
}
