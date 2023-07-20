
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
 
 const firebaseConfig = {
  apiKey: "AIzaSyCSI8n7J_YwbWi0-9tUzbi7ptwkYENmL98",
      authDomain: "whats-app-clone-f4eea.firebaseapp.com",
       projectId: "whats-app-clone-f4eea",
       storageBucket: "whats-app-clone-f4eea.appspot.com",
     messagingSenderId: "35676903472",
      appId: "1:35676903472:web:56e3d419dee3b23da9f5f5"
 };
 
 const firebaseApp = firebase.initializeApp(firebaseConfig);
 const db = firebaseApp.firestore();
 const auth = firebase.auth();
 const provider = new firebase.auth.GoogleAuthProvider();
 
 
 export { auth, provider };
 export default db;