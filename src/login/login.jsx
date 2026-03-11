import React from 'react';
import {AuthState} from './authState';
import { useNavigate } from 'react-router-dom';

export function Login({ userName, authState, onAuthChange, setUserName }) {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = React.useState('https://images.pexels.com/photos/1161682/pexels-photo-1161682.jpeg');
    const [email, setEmail] = React.useState(userName || '');
    const [password, setPassword] = React.useState('');

    React.useEffect( () => {
        setImageUrl('https://images.pexels.com/photos/1161682/pexels-photo-1161682.jpeg');
    }, []);

    const emailHandler = (e) => {
        setEmail(e.target.value);
        setUserName(e.target.value);
    }

    function loginUser(e) {
        e.preventDefault();
        loginOrCreate(`/api/auth/login`);
    }

    function createUser(e) {
        console.log("inside create user")
        e.preventDefault();
        loginOrCreate(`http://localhost:4000/api/auth/create`);
    }

    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ email: userName, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        console.log(response);
        if (response?.status === 200) {
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
        } else {
            const body = await response.json();
            setDisplayError(`Error: ${body.msg}`);
        }
    }

  return (
    <main id="login" className="d-flex flex-column align-items-center mt-4">
        <form className="text-center">
            <h2>Login</h2>
            <div className="mb-3">
                <input type="email" placeholder="Email" className="form-control mb-3" value={email} onChange={(e) => emailHandler(e)}/></div>
            <div className="mb-3">
                <input type="password" placeholder="Password" className="form-control mb-3" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-outline-secondary" onClick={loginUser}>Login</button>
            <button type="submit" className="btn btn-outline-secondary" onClick={createUser}>Create</button>
        </form>
        <img src={imageUrl} className="mx-auto d-block mt-5" alt="random image of food" width="150" height="150"/>
    </main>
  );
}