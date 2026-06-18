import React from 'react'

function RoomList({ rooms, activeRoom, onSelectRoom }) {
  return (
    <div>
      {rooms.map((room) => (
        <div
          key={room.id}
          onClick={() => onSelectRoom(room)}
          style={{
            padding: '8px',
            cursor: 'pointer',
            borderRadius: '6px',
            marginBottom: '4px',
            background: activeRoom.id === room.id ? '#5865f2' : '#2e2e3e',
            color: 'white',
          }}
        >
          # {room.name}
        </div>
      ))}
    </div>
  )
}

export default RoomList