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

  canRemoveDice: boolean = true; // Controla si el botón de quitar dado es visible
  canAddDice: boolean = false; // Empieza en false porque ya tenemos 5 dados

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

    this.canAddDice = this.dices.length < 5;
    this.canRemoveDice = this.dices.length > 1;

    this.updateDiceButtons();
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

    if (this.dices.length < 5) {
      this.dices.push(0);
      this.canRemoveDice = true;
    }

    this.canAddDice = this.dices.length < 5;
  }

   // Método para quitar un dado
  removeDice(event: Event) {

    event.stopPropagation();

    if (this.dices.length > 1) {
      this.dices.pop();
      this.canAddDice = true;
    }

    this.canRemoveDice = this.dices.length > 1;
  }

  // Actualiza la visibilidad del botón de quitar dado
  private updateDiceButtons() {
    this.canRemoveDice = this.dices.length > 1;
  }
  
}
