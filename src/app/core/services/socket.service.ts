import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket | null = null; 
  private connectedUsers: string[] = []; // Array para almacenar usuarios conectados

  constructor() {
    this.connect(); // Conectar automáticamente al inicializar el servicio
  }

  public connect() {
    if (!this.socket || !this.socket.connected) {
      this.socket = io('http://localhost:3000', {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
      });

      this.socket.on('connect', () => {
        console.log('Connected to the server');
        if (this.socket) {
          this.socket.emit('requestUsers'); // Solicitar lista de usuarios conectados
        }
      });

      this.socket.on('usersUpdate', (users: string[]) => {
        this.connectedUsers = users; // Actualizar lista de usuarios conectados
      });
    }
  }

  public getConnectedUsers() {
    return this.connectedUsers; // Retornar la lista de usuarios conectados
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Disconnected from the server');
      this.socket = null; // Establecer a null después de desconectar
    }
  }

  public on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  public emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  // Método para escuchar el evento de actualización de la lista de usuarios conectados
  public onUpdateUserList(callback: (users: string[]) => void) {
    this.on('updateUserList', callback);
  }
}
