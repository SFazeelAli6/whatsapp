import React, { useEffect, useState } from 'react'
import './Sidebarchat.css'
import { Avatar } from '@mui/material';
import db from "./firebase"
import { Link } from 'react-router-dom';
//  import { Avatar } from "@material-ui/core";


function Sidebarchat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
    
  const [messages, setMessages] = useState("");

  useEffect(()  => {
      if (id) {
          db.collection("Room")
          .doc(id)
          .collection("messages")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) =>
          doc.data()))
          );
      }
  }, []); 


  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Enter Your Name");

    if (roomName) {
      db.collection("Room").add({
        name: roomName,
      });
    }
  };
  // alt="Cindy Baker" src={`https://avatars.dicebear.com/api/human/${seed}.svg`}

  
  return !addNewChat ? (
    <Link to={`/Room/${id}`}>
    <div className="sidebarChat">

      <Avatar  />

      <div className="sidebarChat__info">

        <h2>{name}</h2>
        <p>{messages[0]?.message}</p>
      </div>
    </div>
    </Link>
  ) :
    (
      <div onClick={createChat}
        className="sidebarChat">
        <h2>Add New Chat</h2>
      </div>
    )
}

export default Sidebarchat