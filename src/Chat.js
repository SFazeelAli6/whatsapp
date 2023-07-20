import React, { useState, useEffect } from 'react';
import "./Chat.css";
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import db from "./firebase";
import firebase from "firebase/compat/app";
import { useStateValue } from './StateProvider';

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const  {roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() =>{
    if (roomId) {
      db.collection("Room")
      .doc(roomId)
      .onSnapshot((snapshot) => setRoomName
      (snapshot.data().name));
      db.collection("Room")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
      setMessages(snapshot.docs.map((doc) =>
      doc.data()))
      );
    }
  }, [roomId])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("u typed >>", input);

    db.collection("Room").doc(roomId).collection
    ("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div  className="chat">
        <div className="chat__header">
       <Avatar/>
       <div className="chat__headerInfo">
        <h3>{roomName}</h3>
        <p>Last seen {new Date(messages.timestamp?.toDate
                  ()).toUTCString()}</p>
       </div>
       <div className="chat__headerRight">
       <IconButton variant="text">
        <SearchIcon />
       </IconButton>
       <IconButton variant="text">
        <AttachFileIcon/>
       </IconButton>
       <IconButton variant="text">
       <MoreVertIcon />
       </IconButton>
       </div>
        </div>
        <div className="chat__body">
          {messages.map((message) => (
            <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
            <span className="chat__name">{message.name}
              </span>
              {message.message}
              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate
                  ()).toUTCString()}
              </span>
            </p>
            ))}
        </div>
        <div className="chat__footer">
           <InsertEmoticonIcon />
           <form action="">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text" />
            <button onClick={sendMessage} type="submit">Send a message</button>
           </form>
           <MicIcon />
        </div>
    </div>
  )
}

export default Chat