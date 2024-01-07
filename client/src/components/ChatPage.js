import React, { useEffect, useState, useRef } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

 

  return (
    <div className="chat">
      <p>{localStorage.getItem('room')}</p>
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages}  />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
