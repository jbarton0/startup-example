import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';
import { Login } from './login/login';
import { Main } from './main/main';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { AuthState } from './login/authState';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

  console.log("opened the socket???? maybe", socket);

  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onmessage = async (event) => {
    try {
    let data;

    if (event.data instanceof Blob) {
      const text = await event.data.text();
      data = JSON.parse(text);
    } else {
      data = JSON.parse(event.data);
    }

    if (data.type === 'newRating') {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 1000);
    }
    } catch (err) {
      console.error('Invalid WS message', err);
    }
  };

  socket.onclose = () => {
    console.log('WebSocket closed');
  };

  socket.onerror = (err) => {
    console.error('WebSocket error:', err);
  };

  socket.onclose = (e) => console.log('WS closed — code:', e.code, 'reason:', e.reason);


  return () => {
    socket.close();
  };
}, []);


  return (
    <BrowserRouter>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top" data-bs-theme="light">
          <div className="container-fluid">
            <NavLink className="navbar-brand">Meal Prep</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
              {authState === AuthState.Authenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/">Login</NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/main">Main</NavLink>
                </li>
              )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path='/' element={
          <Login
            userName={userName} 
            authState={authState} 
            onAuthChange={(userName,authState) => {
              setAuthState(authState); 
              setUserName(userName);
            }}
            setUserName={setUserName}
          />
          } 
          exact />
        <Route path='/main' element={<Main userName={userName}/>} exact />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <footer className="fixed-bottom p-3 d-flex justify-content-between align-items-center">
          <a href="https://github.com/jbarton0/startup-example" style={{color: 'black'}}>Jacqueline Barton's GitHub</a>
          <span className={`badge ${isActive ? 'pulse' : ''}`}>New Rating Submitted</span>
        </footer>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}
