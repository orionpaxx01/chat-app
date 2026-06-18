import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import UsernamePrompt from './components/UsernamePrompt'
import socket from './socket'

const rooms = [
  { id: 1, name: 'general' },
  { id: 2, name: 'random' },
  { id: 3, name: 'gaming' },
]

function App() {
  const [activeRoom, setActiveRoom] = useState(rooms[0])
  const [username, setUsername] = useState('')

  useEffect(() => {
    // check if username already saved
    const saved = localStorage.getItem('username')
    if (saved) setUsername(saved)

    socket.on('connect', () => {
      console.log('Connected:', socket.id)
    })

    return () => {
      socket.off('connect')
    }
  }, [])

  // show prompt if no username
  if (!username) {
    return <UsernamePrompt onUsernameSet={setUsername} />
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        rooms={rooms}
        activeRoom={activeRoom}
        onSelectRoom={setActiveRoom}
        username={username}
      />
      <ChatWindow activeRoom={activeRoom} username={username} />
    </div>
  )
}

export default App