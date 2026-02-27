import React from 'react';

export default function RecipeCard ({ title, link, rating, imgSrc, userName }) {

    const [userRating, setRating] = React.useState(null);

    const enterHandler = (e) => {
        if (e.key == 'Enter') setRating(e.target.value)
    }
    
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
                            <input type="text" className="form-control" placeholder="Enter a Number 1-10" onKeyDown={(e) => enterHandler(e)}></input>
                        </ul>
                    </div>
                </div>
            </div>
    )
}