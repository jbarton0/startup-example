import React from 'react';

export function Login() {
    const [imageUrl, setImageUrl] = React.useState('');

    React.useEffect( () => {
        setImageUrl(`https://images.pexels.com/photos/1161682/pexels-photo-1161682.jpeg`);
    }, []);

    /* from tutorial video:
    function loginUser({setUser}) {
        const [text, setText] = React.useState('');
        function loginUser() {
            localStorage.setItem('user', text);
            setUser(text);
        }
    }*/
  return (
    <main id="login" className="d-flex flex-column align-items-center mt-4">
        <form method="get" action="main.html" className="text-center">
            <h2>Login</h2>
            <div className="mb-3">
                <input type="email" placeholder="Username" className="form-control mb-3" id="exampleInputEmail1" aria-describedby="emailHelp"/></div>
            <div className="mb-3">
                <input type="password" placeholder="Password" className="form-control mb-3" id="exampleInputPassword1"/>
            </div>
            <button type="submit" className="btn btn-outline-secondary"/*onClick={loginUser [create func]}*/>Submit</button>
        </form>
        <img src={imageUrl} className="mx-auto d-block mt-5" alt="random image of food" width="150" height="150"/>
    </main>
  );
}