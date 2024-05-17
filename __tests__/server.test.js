const io = require('socket.io-client');
const server = require('../socket.js');

const PORT = process.env.PORT || 2525;

describe('Socket.io Server', () => {
  let clientSocket;

  beforeEach((done) => {
    clientSocket = io(`http://localhost:${PORT}`);
    clientSocket.on('connect', () => {
      console.log('Cliente conectado:', clientSocket.id);
      done();
    });
  });

  afterEach(() => {
    if (clientSocket.connected) {
      clientSocket.disconnect();
    }
  });

  afterAll((done) => {
    server.close(done);
  });
  


  test('should connect to the server', (done) => {
    expect(clientSocket.connected).toBe(true);
    done();
  });

  test('should join room and emit initialCoordinates', (done) => {
    const roomName = 'testRoom';
    console.log('Enviando joinRoom evento:', roomName);
    clientSocket.on('initialCoordinates', (initialCoordinates, validCoordinates) => {
      console.log('Recibido initialCoordinates evento:', initialCoordinates, validCoordinates);
      try {
        expect(initialCoordinates).toEqual({ x: 370, y: 270 });
        expect(validCoordinates).toEqual({ x: 370, y: 370 });
        done();
      } catch (error) {
        done(error);
      }
    });
    clientSocket.emit('joinRoom', roomName);
  }, 10000);  // Aumenta el tiempo de espera a 10 segundos
});


