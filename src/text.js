import { useState } from "react";
import db from "./firebase";

const  [input, setInput] = useState("");

const  sendMessage = (e) => {
e.prevent.Default("")
console.log("you typed", input)
////for example in input field u type yoyooyoo
setInput("")
}
 //console.loged value will be you typed yoyoyoyo

<form action="">
<input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text" />
<button onClick={sendMessage} type="submit">Send a message</button>
 </form>  


// retrieve rooms from database
 useEffect(() => {
   db.collection("Room").onSnapshot((snapshot) => setRooms (
    snapshot.room.map((doc) => ({
    id: room.id,
    data: room.data
    })
   

    )

   )

 )})

 const [input, setInput] = useState("")
 const [messages, setMessages] = useState("")

 useEffect(() => {
  if(roomId) {
    
    db.collection("Room").doc(roomId).onSnapshot


    db.collection("Room").doc(roomId).collection("messages").Orderby
    ("timestamp", "asc").onSnapshot((snapshot) => setMessages (
      snapshot.docs.map(doc => doc.data())
    ))
  }
 })


 db.collection("Room").onSnapshot((snapshot) => setRooms (
  snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
  }))
 ))

 db.collection("Room").doc(Id).collection("messages").Orderby("timestamp", "desc").onSnapshot((snapshot) => setMessages(
  snapshot.docs.map(doc => doc.data())
 ))

 const [user, setuser] = useState(null)

 {!user ? (
  <h1>Login</h1>
 ):(
  <div className="app__body">
  <Router>
    <Sidebar />
    <Routes>
      <Route path='/Room/:roomId'  
      element={<Chat/>}
      />
    </Routes>
   

  </Router>
</div>
 )}
const signIn = () => {
  auth.signInWithPopup(provider)
  .then((result) => console.log(result))
  .catch((error) => alert(error.message))
}

 <div className="login_container">
 <div className="login_text">
<p>sign in to whatsapp</p>
 </div>

<Button type="submit" onClick="signIn">
  Sign in with google
</Button>

 </div>
 
 db.collection("Room").doc(roomId).collection("messages").orderBy("timestamp", "Asc")
 .onSnapshot((snapshot) => setMessages(
  snapshot.docs.map((doc) => doc.data())
 ))

 db.collection("Room").doc(roomId).collection("messages").add({
  message: input,
  user: user.displayName,
  timestamp: firebase.firestore.FieldValue.serverTimestamp()
 })