import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton } from '@ionic/angular/standalone';
import { ColorService } from 'src/app/services/color.service';
import { Router } from '@angular/router';
import { ManoHabilService } from 'src/app/services/mano-habil.service'; // Importa el servicio

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GamePage implements OnInit {
  colorFondo!: string;
  colorFuente!: string;
  iconPosition!: string;
  @ViewChild('diceElement') diceElement!: ElementRef;
  diceArray: number[] = Array(5).fill(0); // Crea un arreglo de 5 elementos
  private pressTimer: any; // Para el temporizador del press

  constructor(private colorService: ColorService,
              private router: Router,
              private manoHabilService: ManoHabilService // Asegúrate de inyectar el servicio aquí 
              ) {}

  ngOnInit() {
    this.colorFondo = this.colorService.getColorFondo();
    this.colorFuente = this.colorService.getColorFuente(); // Utiliza el método adecuado si ya tienes otro color específico
    document.documentElement.style.setProperty('--color-fondo', this.colorFondo);
    console.log("Color de fondo aplicado:", this.colorFondo); // Revisa que el color no sea negro
    this.manoHabilService.manoHabil$.subscribe((manoHabil) => {
      this.iconPosition = manoHabil === 'hand-left' ? 'left' : 'right';
    });
  }

  // Reemplaza el uso de navCtrl con el router
  navigateToHome() {
    this.router.navigate(['/']); // Cambia '/' por la ruta de tu página anterior
  }

  spinDice() {
    const rnd = Math.floor(Math.random() * 6 + 1);
    let x: number, y: number;

    switch (rnd) {
      case 1:
        x = 720;
        y = 810;
        break;
      case 6:
        x = 720;
        y = 990;
        break;
      default:
        x = 720 + (6 - rnd) * 90;
        y = 900;
        break;
    }

    this.diceElement.nativeElement.style.transform = `translateZ(-100px) rotateY(${x}deg) rotateX(${y}deg)`;
  }

}
