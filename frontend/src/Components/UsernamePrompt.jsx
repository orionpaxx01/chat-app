import { useState } from 'react'

function UsernamePrompt({ onUsernameSet }) {
  const [input, setInput] = useState('')

  function handleSubmit() {
    if (input.trim() === '') return
    localStorage.setItem('username', input.trim())
    onUsernameSet(input.trim())
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1e1e2e',
      color: 'white'
    }}>
      <h1 style={{ marginBottom: '8px' }}>💬 Welcome to ChatApp</h1>
      <p style={{ color: '#aaa', marginBottom: '24px' }}>Enter a username to get started</p>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Your username..."
          autoFocus
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid #444',
            background: '#2e2e3e',
            color: 'white',
            fontSize: '15px',
            width: '220px'
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            background: '#5865f2',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          Join →
        </button>
      </div>
    </div>
  )
}

export default UsernamePrompt