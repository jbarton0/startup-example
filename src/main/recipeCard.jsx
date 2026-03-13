import React from 'react';

export default function RecipeCard ({ title, link, rating, imgSrc, userName }) {
    // add weight for rating (ex number of people that have rated the recipe)

    const storageKey = `rating-${title}-${userName}`;
    const [userRating, setRating] = React.useState(() => {
        return localStorage.getItem(storageKey) || null;
    });

    React.useEffect(() => {
        if (userRating !== null) {
            localStorage.setItem(storageKey, userRating);

        }
    }, [userRating]);

    const enterHandler = (e) => {
        if (e.key == 'Enter') {
            const value = Number(e.target.value)

            if (value >=1 && value <=10) {
                setRating(value);
            }
        }
    };
    
    return (
        <div className="card m-4" style={{ width: '15rem' }}>
                <img src={ imgSrc } alt="Meal prep recipe photo" className="card-img-top" height="150"></img>
                <div className="card-body">
                    <a href={ link } style={{ color: "goldenrod" }}>{ title }</a>
                    <p className="card-text small">Submitted by ____</p>
                    <span style={{ color: "brown" }}>Rating: { rating }</span>
                    
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