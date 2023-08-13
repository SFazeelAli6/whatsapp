
import './Sidebar.css'
import Avatar from '@mui/material/Avatar';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import Sidebarchat from './Sidebarchat';
import IconButton from '@mui/material/IconButton';
import db from "./firebase"
import { useState, useEffect } from 'react';
import { useStateValue } from './StateProvider';

function Sidebar(props) {
 const [Room, setRooms] = useState([]);
 const [{user},dispatch] = useStateValue();

 
 useEffect(() => {
    const unsubscribe = db.collection('Room').onSnapshot(snapshot => (
        setRooms(snapshot.docs.map(doc => (
            {
                id: doc.id,
                data: doc.data()
            }
        )

        ))
    ));

    return () => {
        unsubscribe();
    }
},[]); 

return (
    <div className="sidebar">
        <div className="sidebar_header">
            <Avatar src={user?.photoURL}/>
            <div className="sidebar_headerRight">
                <IconButton>
                    <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                    <ChatIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
                
            </div>
        </div>
        <div className="sidebar_search">
            <div className="sidebar_searchContainer">
                <SearchIcon />
                <input type="text" placeholder="Search or start new chat"/>
            </div>
        </div>
        <div className="sidebar_chats">
            <Sidebarchat addNewChat/>
            {Room.map(room=> (
                <Sidebarchat key={room.id} id={room.id} name={room.data.name}/>
            ))}
        </div>
    </div>
);
}


export default Sidebar;