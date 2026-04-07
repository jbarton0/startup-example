import React from 'react';

export default function RecipeCard ({ id, title, link, rating, imgSrc, userName, currentUser }) {

    const storageKey = `rating-${title}-${currentUser}`;
    const [avgRating, setAvgRating] = React.useState(rating);
    const [userRating, setRating] = React.useState(() => {
        return localStorage.getItem(storageKey) || null;
    });

    React.useEffect(() => {
        if (userRating !== null) {
            localStorage.setItem(storageKey, userRating);
        }
    }, [userRating]);

    React.useEffect(() => {
        setAvgRating(rating);
    }, [rating]);

    const enterHandler = async (e) => {
        if (e.key == 'Enter') {
            const value = Number(e.target.value)

            if (value >=1 && value <=10) {
                setRating(value);

                const response = await fetch('/api/recipes/rate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    id,
                    rating: value,
                }),
            });

            const data = await response.json();
            if (response.ok && data.average != null) {
                setAvgRating(data.average);
                const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
                const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

                socket.onopen = () => {
                    socket.send(JSON.stringify({
                        type: 'newRating',
                        recipeId: id,
                    }));
                    socket.close();
                };

            } else if (!response.ok) {
                console.error('Error rating recipe:', data.error);
            }
            }
        }
    };
    
    return (
        <div className="card m-4" style={{ width: '15rem' }}>
                <img src={ imgSrc } alt="Meal prep recipe photo" className="card-img-top" height="150"></img>
                <div className="card-body">
                    <a href={ link } style={{ color: "goldenrod" }}>{ title }</a>
                    <p className="card-text small">Submitted by {userName}</p>
                    <span style={{ color: "brown" }}>Rating: { typeof avgRating === 'number' ? avgRating.toFixed(1) : "N/A" }</span>
                    
                    {userRating && (
                        <p>{ currentUser.split('@')[0] } rated { userRating }</p>
                    )}
                   
                    <div>
                        <button className="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            New Rating
                        </button>
                        <ul className="dropdown-menu">
                            <input type="number" min="1" max="10" className="form-control" placeholder="Enter a Number 1-10" onKeyDown={(e) => enterHandler(e)}></input>
                        </ul>
                    </div>
                </div>
            </div>
    )
}