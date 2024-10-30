import { Component, OnInit, ViewChildren, QueryList, ElementRef, ChangeDetectorRef } from '@angular/core';
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
  
  // Usar ViewChildren para acceder a todos los dados
  @ViewChildren('diceElement') diceElements!: QueryList<ElementRef>;
  
  dices: number[] = Array(5).fill(0); // Crea un arreglo de 5 elementos

  constructor(private colorService: ColorService,
              private router: Router,
              private manoHabilService: ManoHabilService,
              private cdr: ChangeDetectorRef) {} // ChangeDetectorRef agregado

  ngOnInit() {
    this.colorFondo = this.colorService.getColorFondo();
    this.colorFuente = this.colorService.getColorFuente();
    document.documentElement.style.setProperty('--color-fondo', this.colorFondo);
    console.log("Color de fondo aplicado:", this.colorFondo);

    // Inicializa con 5 dados con valores aleatorios
    this.dices = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6 + 1));
    
    this.manoHabilService.manoHabil$.subscribe((manoHabil) => {
      this.iconPosition = manoHabil === 'hand-left' ? 'left' : 'right';
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  spinDice() {

    // Convertir el QueryList a un array de elementos
    const diceArray = this.diceElements.toArray();
    
    diceArray.forEach((diceElement) => {
      const rnd = Math.floor(Math.random() * 6 + 1);
      let x: number, y: number;
  
      // Mantener el switch original para las rotaciones
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
  
      // Aplicar la transformación
      diceElement.nativeElement.style.transform = `translateZ(-100px) rotateY(${x}deg) rotateX(${y}deg)`;
    });
  }

  // Método para agregar un dado
  addDice(event: Event) {

    event.stopPropagation();

    if (this.dices.length < 5) { // Limita la cantidad de dados a 5
      const newValue = Math.floor(Math.random() * 6 + 1); // Genera un valor aleatorio entre 1 y 6
      this.dices.push(newValue);
    }
  }

   // Método para quitar un dado
  removeDice(event: Event) {

    event.stopPropagation();

    if (this.dices.length > 0) {
      this.dices.pop();
    }
  }
  
}
