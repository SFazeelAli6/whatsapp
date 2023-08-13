import React, { useEffect, useState } from 'react'
import './Sidebarchat.css'
import { Avatar } from '@mui/material';
import db from "./firebase"
import { Link } from 'react-router-dom';
import { unsubscribe } from '@mui/icons-material';
//  import { Avatar } from "@material-ui/core";



function SidebarChat({id,name,addNewChat}) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");
    
    useEffect(() => {
        if(id){
            db.collection('Room').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));        
    }, []);

    const createChat = () => {
        const roomName = prompt("Please Enter Name for Chat");

        if(roomName){
            db.collection("Room").add({
                name: roomName
            })
        }
    };

    return !addNewChat ? (
        <Link to={`/Room/${id}`} key={id}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
        
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h3 className="add-new-chat-title">Add New Chat</h3>
        </div>
    )
}

export default SidebarChat