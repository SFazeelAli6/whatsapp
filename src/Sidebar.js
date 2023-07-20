
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

function Sidebar() {

    const [Room, setRooms] = useState([])
    

    useEffect(() => {
        const unsubscribe = db.collection("Room").onSnapshot((snapshot) =>
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );
     return () => {
        unsubscribe();
    }
}, []);

return (
    <div className="sidebar">

        <div className="sidebar__header">

            <Avatar />
            
            <div className="sidebar__headerRight">
                <IconButton variant="text">
                    <DonutLargeIcon />
                </IconButton>

                <IconButton variant="text">
                    <ChatIcon />
                </IconButton>
                <IconButton variant="text">
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>

        <div className="sidebar__search">

            <div className="sidebar__searchContainer">
                <IconButton variant="text">
                    <SearchIcon />
                </IconButton>
                <input placeholder="Search or start new chat" type="text" />
            </div>
        </div>

        <div className="sidebar__chats">

            <Sidebarchat addNewChat />
            {Room.map((room) => (
                <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
            ))}


        </div>

    </div> 
);
}

export default Sidebar;
// module.exports = {
//     plugins: [
//       '@babel/plugin-proposal-private-property-in-object'
//     ]
//   };