import RoomList from './RoomList'

function Sidebar({ rooms, activeRoom, onSelectRoom, username }) {
  return (
    <div style={{ width: '250px', background: '#1e1e2e', height: '100vh', color: 'white', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ marginBottom: '1rem' }}>💬 ChatApp</h2>
      <RoomList rooms={rooms} activeRoom={activeRoom} onSelectRoom={onSelectRoom} />

      {/* username at bottom */}
      <div style={{ marginTop: 'auto', padding: '10px', background: '#2e2e3e', borderRadius: '8px', fontSize: '14px' }}>
        👤 {username}
      </div>
    </div>
  )
}

export default Sidebar