const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')


const app = express()

// faz o server entender protocolo http e websocket
const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect('mongodb+srv://oministack7:oministack7@cluster0-n1w22.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

app.use((req, res, next) => {
    req.io = io

    next()
})

app.use(cors())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))
app.use(require('./routes'))


server.listen(3001)