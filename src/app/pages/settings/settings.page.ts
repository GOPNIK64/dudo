import { Component, OnInit } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { ColorService } from 'src/app/services/color.service';
import { NavController } from '@ionic/angular'; // Importa NavController

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent]
})
export class SettingsPage implements OnInit {
  colorFondo!: string;
  colorFuente!: string;

  constructor(private colorService: ColorService, private navCtrl: NavController) {}

  ngOnInit() {
    this.colorFondo = this.colorService.getColorFondo();
    this.colorFuente = this.colorService.getColorFuente();
  }

  navigateToHome() {
    this.navCtrl.navigateBack('/'); // Cambia '/' por la ruta de tu página anterior
  }

  saveSettings() {
    console.log("configuraciones guardadas")
  }
}
