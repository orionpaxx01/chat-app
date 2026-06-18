const path = require('path')
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Message = require('./models/Message')

// add this instead
dotenv.config({ path: require('path').resolve(__dirname, '.env') })

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: 'http://localhost:5173' }
})

// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('MongoDB error:', err))

// route to get old messages for a room
app.get('/messages/:roomId', async (req, res) => {
  try {
    const messages = await Message.find({ roomId: req.params.roomId })
      .sort({ timestamp: 1 })
      .limit(50)
    res.json(messages)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
})

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join_room', (roomId) => {
    socket.join(roomId)
    console.log(`User ${socket.id} joined room ${roomId}`)
  })

  socket.on('send_message', async (data) => {
    // save to mongodb
    const message = new Message({
      roomId: data.roomId,
      user: data.user,
      text: data.text,
    })
    await message.save()

    // broadcast to room
    io.to(data.roomId).emit('new_message', data)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

server.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})