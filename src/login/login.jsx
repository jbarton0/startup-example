import React from 'react';
import {AuthState} from './authState';
import { useNavigate } from 'react-router-dom';

export function Login({ userName, authState, onAuthChange, setUserName }) {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = React.useState('https://images.pexels.com/photos/1161682/pexels-photo-1161682.jpeg');
    const [email, setEmail] = React.useState(userName || '');

    React.useEffect( () => {
        setImageUrl('https://images.pexels.com/photos/1161682/pexels-photo-1161682.jpeg');
    }, []);

    const emailHandler = (e) => {
        setEmail(e.target.value);
        setUserName(e.target.value);
    }

    function loginUser(e) {
        e.preventDefault();
        localStorage.setItem('userName', email);
        onAuthChange(email, AuthState.Authenticated);
        navigate('/main')
        }

  return (
    <main id="login" className="d-flex flex-column align-items-center mt-4">
        <form className="text-center" onSubmit={loginUser}>
            <h2>Login</h2>
            <div className="mb-3">
                <input type="email" placeholder="Email" className="form-control mb-3" value={email} onChange={(e) => emailHandler(e)}/></div>
            <div className="mb-3">
                <input type="password" placeholder="Password" className="form-control mb-3" id="exampleInputPassword1"/>
            </div>
            <button type="submit" className="btn btn-outline-secondary" >Submit</button>
        </form>
        <img src={imageUrl} className="mx-auto d-block mt-5" alt="random image of food" width="150" height="150"/>
    </main>
  );
}