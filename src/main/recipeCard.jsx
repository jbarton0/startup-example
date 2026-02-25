
export default function RecipeCard ({ title, link, rating, imgSrc}) {
    return (
        <div className="card m-4" style={{ width: '15rem' }}>
                <img src={{ link }} alt="Meal prep recipe photo" className="card-img-top" height="150"></img>
                <div className="card-body">
                    <a href={{ imgSrc }} style={{ color: "goldenrod" }}>{{ title }}</a>
                    <p className="card-text small">Submitted by ____</p>
                    <span style={{ color: "brown" }}>Rating: {{ rating }}</span>
                    <div>
                        <button className="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            New Rating
                        </button>
                        <ul className="dropdown-menu">
                            <input type="text" className="form-control" placeholder="Enter a Number 1-10"></input>
                        </ul>
                    </div>
                </div>
            </div>
    )
}