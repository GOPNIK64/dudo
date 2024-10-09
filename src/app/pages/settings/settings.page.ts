import { Component, OnInit } from '@angular/core';
import { IonContent, IonIcon, IonItem } from '@ionic/angular/standalone';
import { ColorService } from 'src/app/services/color.service';
import { Router } from '@angular/router';
import { ManoHabilService } from 'src/app/services/mano-habil.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonItem, IonIcon, IonContent],
})
export class SettingsPage implements OnInit {
  colorFondo!: string;
  colorFuente!: string;
  manoHabilIcon!: string;

  // Inyecta ColorService y Router
  constructor(
    private router: Router, 
    private manoHabilService: ManoHabilService, 
    private colorService: ColorService // Asegúrate de inyectar ColorService
  ) {
    // Inicializa el ícono de mano hábil basado en el servicio
    this.manoHabilService.manoHabil$.subscribe((manoHabil) => {
      this.manoHabilIcon = manoHabil;
    });
  }

  ngOnInit() {
    // Obtén los colores del ColorService
    this.colorFondo = this.colorService.getColorFondo();
    this.colorFuente = this.colorService.getColorFuente();
    
    // Cargar mano habil desde localStorage
    this.manoHabilIcon = localStorage.getItem('manoHabil') || 'hand-right'; // Valor por defecto
  }

  // Reemplaza el uso de navCtrl con el router
  navigateToHome() {
    this.router.navigate(['/']); // Cambia '/' por la ruta de tu página anterior
  }

  saveSettings() {
    // Guarda la configuración de la mano hábil en local storage
    localStorage.setItem('manoHabil', this.manoHabilIcon);
    console.log("Configuraciones guardadas");
  }

  cambiarManoHabil() {
    // Llama al método del servicio para cambiar la mano hábil
    this.manoHabilService.cambiarManoHabil();
    console.log('Configuración de mano hábil cambiada a:', this.manoHabilIcon);
  }
}
