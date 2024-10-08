// En tu archivo de servidor (por ejemplo, index.js o server.js)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const connectedUsers = []; // Array para almacenar usuarios conectados

io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado: ' + socket.id);
  
  // Agregar el nuevo usuario a la lista
  connectedUsers.push(socket.id);
  
  // Emitir la lista de usuarios conectados a todos los clientes
  io.emit('updateUserList', connectedUsers);

  // Manejar la desconexión
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado: ' + socket.id);
    
    // Remover el usuario de la lista
    const index = connectedUsers.indexOf(socket.id);
    if (index > -1) {
      connectedUsers.splice(index, 1);
    }

    // Emitir la lista actualizada de usuarios
    io.emit('updateUserList', connectedUsers);
  });
});

// Iniciar el servidor
server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
