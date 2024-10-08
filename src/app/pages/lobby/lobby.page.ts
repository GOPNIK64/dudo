// lobby.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, NavController, IonIcon } from '@ionic/angular/standalone';
import { ColorService } from 'src/app/services/color.service';
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LobbyPage implements OnInit {
  colorFondo!: string;
  colorFuente!: string;
  welcomeMessage!: string;
  connectedUsers: string[] = []; // Almacenar la lista de usuarios conectados

  constructor(
    private colorService: ColorService,
    private socketService: SocketService,
    private navCtrl: NavController 
  ) {}

  ngOnInit() {
    this.colorFondo = this.colorService.getColorFondo();
    this.colorFuente = this.colorService.getColorFuente();

    const ionContent = document.querySelector('ion-content');
    if (ionContent) {
      ionContent.style.setProperty('--background', this.colorFondo);
    }

    const titleElement = document.querySelector('ion-title');
    if (titleElement) {
      titleElement.style.color = this.colorFuente;
    }

    this.socketService.on('welcome', (message: string) => {
      this.welcomeMessage = message;
      console.log(message);
    });

    // Obtener la lista de usuarios conectados
    this.connectedUsers = this.socketService.getConnectedUsers();
    
    // Escuchar cambios en la lista de usuarios
    this.socketService.on('usersUpdate', (users: string[]) => {
      this.connectedUsers = users;
    });
  }

  refreshConnection() {
    this.socketService.disconnect(); 
    this.socketService.connect(); 
    console.log('Reconnected to the socket server');
  }

  navigateToHome() {
    this.navCtrl.navigateBack('/'); 
  }
}
