import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';
import { Login } from './login/login';
import { Main } from './main/main';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top" data-bs-theme="light">
          <div className="container-fluid">
            <a className="navbar-brand">Meal Prep</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="index.html">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="main.html">Main</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>App components go here</main>

      <footer className="fixed-bottom p-3 d-flex justify-content-between align-items-center">
          <a href="https://github.com/jbarton0/startup-example" style={{color: 'black'}}>Jacqueline Barton's GitHub</a>
          <span className="badge text-bg-light">New Rating Submitted</span>
        </footer>
    </BrowserRouter>
  );
}
