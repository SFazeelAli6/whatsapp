import React from 'react'
import "./Login.css"
import Button from '@mui/material/Button';
import{ auth, provider} from "./firebase";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
const [{}, dispatch] = useStateValue()

    const signIn = () => { 
    auth
    .signInWithPopup(provider)
    .then((result) => {
        dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
        });
    })
    .catch((error) => alert(error.message));
    };
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F6b%2FWhatsApp.svg%2F1200px-WhatsApp.svg.png&tbnid=AqL1RlnhoDwPOM&vet=12ahUKEwiN2u6Zy5iAAxVsmycCHTl9DrQQMygAegUIARDlAQ..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FWhatsApp&docid=RjTzvvVwSvYLDM&w=1200&h=1207&q=whatsapp%20image&ved=2ahUKEwiN2u6Zy5iAAxVsmycCHTl9DrQQMygAegUIARDlAQ"
                    alt="" >

                </img>
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button  onClick={signIn}>
                    Sign in with Google
                </Button>

            </div>
        </div>
    )
}

export default Login