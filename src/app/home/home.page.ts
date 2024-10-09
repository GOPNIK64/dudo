import { Component, OnInit } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import { CommonModule } from '@angular/common';
import { ManoHabilService } from 'src/app/services/mano-habil.service'; // Importa el servicio

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, CommonModule],
})
export class HomePage implements OnInit {
  coloresClaros = ['#FC6A0F', '#508AA8', '#E0FF4F'];
  coloresOscuros = ['#031927', '#1C0D03', '#BA1200'];
  iconPosition!: string;

  constructor(
    private router: Router,
    private colorService: ColorService,
    private manoHabilService: ManoHabilService // Asegúrate de inyectar el servicio aquí
  ) {}

  ngOnInit() {
    this.aplicarColores(); // Asegúrate de aplicar colores al iniciar
  
    this.manoHabilService.manoHabil$.subscribe((manoHabil) => {
      this.iconPosition = manoHabil === 'hand-left' ? 'left' : 'right';
    });
  }
  
  aplicarColores() {
    const ionContent = document.querySelector('ion-content');
    const h1 = document.querySelector('h1');
    const ionIcons = document.querySelectorAll('ion-icon');

    const colorFondo = this.colorService.getColorFondo();
    const colorFuente = this.colorService.getColorFuente();

    if (ionContent && h1) {
      ionContent.style.setProperty('--background', colorFondo);
      h1.style.color = colorFuente;
      h1.style.display = 'block';
      ionIcons.forEach(icon => icon.style.color = colorFuente);
    }
  }

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

  irAInstrucciones() {
    this.router.navigate(['/instructions']);
  }

  irAConfiguracion() {
    this.router.navigate(['/settings']);
  }

  irAGame() {
    this.router.navigate(['/game']);
  }
}
