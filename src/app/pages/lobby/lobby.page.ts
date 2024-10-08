import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ColorService } from 'src/app/services/color.service'; // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LobbyPage implements OnInit {
  colorFondo!: string;
  colorFuente!: string;

  constructor(private colorService: ColorService) { } // Asegúrate de que esto esté correcto

  ngOnInit() {
    // Obtener los colores del servicio
    this.colorFondo = this.colorService.getColorFondo();
    this.colorFuente = this.colorService.getColorFuente();
    
    // Aplicar los colores al contenido
    const ionContent = document.querySelector('ion-content');
    if (ionContent) {
      ionContent.style.setProperty('--background', this.colorFondo);
    }

    // Aplicar el color de fuente al título
    const titleElement = document.querySelector('ion-title');
    if (titleElement) {
      titleElement.style.color = this.colorFuente;
    }
  }
}
