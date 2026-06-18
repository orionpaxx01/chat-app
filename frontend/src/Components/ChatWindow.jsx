import { useState, useEffect } from 'react'
import socket from '../socket'

function ChatWindow({ activeRoom, username }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

useEffect(() => {
  // fetch old messages from backend
  fetch(`http://localhost:3000/messages/${activeRoom.id}`)
    .then((res) => res.json())
    .then((data) => setMessages(data))
    .catch((err) => console.log(err))

  // join room
  socket.emit('join_room', activeRoom.id)

  // listen for new messages
  socket.on('new_message', (data) => {
    setMessages((prev) => [...prev, data])
  })

  return () => {
    socket.off('new_message')
  }
}, [activeRoom])

  function sendMessage() {
    if (input.trim() === '') return

    const data = {
  roomId: activeRoom.id,
  user: username,   // ← was hardcoded 'You' before
  text: input,
}

    socket.emit('send_message', data)
    setInput('')
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>

      <div style={{ padding: '1rem', borderBottom: '1px solid #333' }}>
        <h2 style={{ margin: 0 }}># {activeRoom.name}</h2>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '12px' }}>
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>{msg.user}</span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '1rem', display: 'flex', gap: '8px', borderTop: '1px solid #333' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={`Message #${activeRoom.name}`}
          style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #444', background: '#2e2e3e', color: 'white' }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: '8px 16px', borderRadius: '6px', background: '#5865f2', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Send
        </button>
      </div>

    </div>
  )
}

export default ChatWindow