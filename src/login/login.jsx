import React from 'react';

export function Login() {
  return (
    <main id="login" className="d-flex flex-column align-items-center mt-4">
        <form method="get" action="main.html" className="text-center">
            <h2>Login</h2>
            <div className="mb-3">
                <input type="email" placeholder="Username" className="form-control mb-3" id="exampleInputEmail1" aria-describedby="emailHelp"/></div>
            <div className="mb-3">
                <input type="password" placeholder="Password" className="form-control mb-3" id="exampleInputPassword1"/>
            </div>
            <button type="submit" className="btn btn-outline-secondary">Submit</button>
        </form>
        <img src="https://images.pexels.com/photos/1161682/pexels-photo-1161682.jpeg" className="mx-auto d-block mt-5" alt="Healthy Food" width="150" height="150"/>
    </main>
  );
}