// index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8100", // Cambia el puerto si tu Ionic se ejecuta en otro puerto
    methods: ["GET", "POST"]
  }
});

// Evento de conexión
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado:', socket.id);

  // Evento personalizado para cuando un usuario se une al lobby
  socket.on('joinLobby', (userName) => {
    console.log(`${userName} se ha unido al lobby`);
    io.emit('userJoined', `${userName} se ha unido al lobby`);
  });

  // Evento de desconexión
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado:', socket.id);
    io.emit('userLeft', `Un usuario se ha desconectado: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
