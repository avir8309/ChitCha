import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    localStorage.setItem('room', room);
    socket.emit('newRoom', { userName: userName, SocketID: socket.id, room: room });
    socket.emit('newUser', { userName: userName, SocketID: socket.id,room:room });
    

    navigate(`/chat`);
  };

  const handleRoomChange = (e) => {
    setRoom(e.target.value);
  };

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter room number"
        value={room}
        onChange={handleRoomChange}
      ></input>
      <button className="home__cta">SIGN IN</button>
    </form>
  );
};

export default Home;