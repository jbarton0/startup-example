import React from 'react';

export default function RecipeCard ({ id, title, link, rating, imgSrc, userName }) {

    const storageKey = `rating-${title}-${userName}`;
    const [avgRating, setAvgRating] = React.useState(rating);
    const [userRating, setRating] = React.useState(() => {
        return localStorage.getItem(storageKey) || null;
    });

    React.useEffect(() => {
        if (userRating !== null) {
            localStorage.setItem(storageKey, userRating);

        }
    }, [userRating]);

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
            setAvgRating(data.average);
            }
        }
    };
    
    return (
        <div className="card m-4" style={{ width: '15rem' }}>
                <img src={ imgSrc } alt="Meal prep recipe photo" className="card-img-top" height="150"></img>
                <div className="card-body">
                    <a href={ link } style={{ color: "goldenrod" }}>{ title }</a>
                    <p className="card-text small">Submitted by ____</p>
                    <span style={{ color: "brown" }}>Rating: { avgRating ? avgRating.toFixed(1) : "N/A" }</span>
                    
                    {userRating && (
                        <p>{ userName.split('@')[0] } rated { userRating }</p>
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