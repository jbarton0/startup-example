import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <><header>
      <nav class="navbar navbar-expand-lg fixed-top" data-bs-theme="light">
        <div class="container-fluid">
          <a class="navbar-brand">Meal Prep</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="index.html">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="main.html">Main</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <main>App components go here</main>
    
    <footer class="fixed-bottom p-3 d-flex justify-content-between align-items-center">
        <a href="https://github.com/jbarton0/startup-example" style="color: black">Jacqueline Barton's GitHub</a>
        <span class="badge text-bg-light">New Rating Submitted</span>
      </footer></>
  );
}
