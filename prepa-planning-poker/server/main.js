const mosca = require("mosca");
const ip = require('ip');

const settings = {
  id: 'planning-poker',
  publishNewClient: true,
  publishClientDisconnect: true,
  http: {
    port: 3000,
    host: ip.address(),
    bundle: true,
    static: './'
  }
};
let clients = [];

var server = new mosca.Server(settings);

server.on('ready', function () {
  console.log('[[ MOSCA listening ]]');
  console.log('[[  Adress: ' + settings.http.host + ':' + settings.http.port + ']]');
});

server.on('clientConnected', (client) => {
  clients.push(client);
  console.log('new connection from ' + client.id);
  setTimeout(publishClients, 100);
});

server.on('clientDisconnected', (client) => {
  clients = clients.filter(item => item !== client);
  publishClients();
});

server.on('published', (arg1) => {
  //console.log('----> ', arg1);
});

function publishClients() {
  const clientIds = clients.map(client => client.id);
  server.publish({
    topic: 'clients',
    payload: JSON.stringify(clientIds)
  });
}