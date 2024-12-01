import aedes from 'aedes'
import http from 'node:http'

const broker = aedes()
const server = http.createServer()

server.on('request', broker.handle)

server.listen(3000, '0.0.0.0', () => {
  console.log('Running on 3000')
})

broker.on('client', (client) => {
  console.log(`Cliente conectado: ${client.id}`)
})

// Evento cuando un cliente se suscribe a un tema
broker.on('subscribe', (subscriptions, client) => {
  subscriptions.forEach((sub) => {
    console.log(`Cliente ${client.id} suscrito a tema: ${sub.topic}`)
  })
})

// Evento cuando un cliente publica un mensaje
broker.on('publish', (packet, client) => {
  if (client) {
    console.log(
      `Cliente ${client.id} publicó en ${
        packet.topic
      }: ${packet.payload.toString()}`
    )
  }
})

// Evento cuando un cliente se desconecta
broker.on('clientDisconnect', (client) => {
  console.log(`Cliente desconectado: ${client.id}`)
})
