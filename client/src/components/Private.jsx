import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [recipientSocketId, setRecipientSocketId] = useState("");
  const [message, setMessage] = useState("");
  //   if below ddnt get i wil add mannually
  const [chatRoomId, setChatRoomId] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const url = "http://localhost:2000";
    const socket = io(url, { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    console.log("socketid in here", socket.id);
    socket.on("privateChatInitiated", (data) => {
      console.log("Private chat initiated:", data);
      setChatRoomId(data.chatRoomId);
    });
    socket.on("privateMessage", (data) => {
      console.log("Private message received:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);
  const privatechatStarted = (e) => {
    e.preventDefault();
    if (socket && socket.connected) {
      socket.emit("privatechatStart", {
        recipientSocketId,
      });
    } else {
      console.error("Socket is not connected");
    }
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (socket && socket.connected && chatRoomId) {
      socket.emit("privateMessage", {
        chatRoomId,
        message,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "me", message },
      ]);
    } else {
      console.error("Not generated private chat");
    }
    setMessage("");
  };
  return (
    <div>
      <h3>Private Chat</h3>
      {chatRoomId && <p>Private Chat Room ID: {chatRoomId}</p>}
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.sender}:</p> {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={privatechatStarted}>
        <input
          type="text"
          id="recipient"
          placeholder="ID"
          value={recipientSocketId}
          onChange={(e) => setRecipientSocketId(e.target.value)}
        />
        <br />
        {/* <button type="submit">Initiate Private Chat</button> */}
      </form>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          id="message"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default App;
