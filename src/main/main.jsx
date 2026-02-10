import React from 'react';

export function Main() {
  return (
    <div>
        <main id="main_" className="d-flex justify-content-center">

            <div className="card m-4" style={{ width: '15rem' }}>
                <img src="https://www.budgetbytes.com/wp-content/uploads/2018/04/Easiest-Burrito-Bowl-Meal-Prep-V3.jpg" alt="Burrito Bowl" className="card-img-top" height="150"></img>
                <div className="card-body">
                    <a href="https://www.budgetbytes.com/easiest-burrito-bowl-meal-prep/" style={{ color: "goldenrod" }}>Burrito Bowl</a>
                    <p className="card-text small">Submitted by ____</p>
                    <span style={{ color: "brown" }}>Rating: 8.7</span>
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
            <br></br>

            <div className="card m-4" style={{ width: '15rem' }}>
                <img src="https://girlheartfood.com/wp-content/uploads/2021/09/Salmon-Rice-Bowl-2.jpg" alt="Salmon Rice Bowl" className="card-img-top" height="150"></img>
                <div className="card-body">
                    <a href="https://www.budgetbytes.com/easiest-burrito-bowl-meal-prep/" style={{ color: "goldenrod" }}>Spicy Salmon</a>
                    <p className="card-text small">Submitted by ____</p>
                    <span style={{ color: "brown" }}>Rating: 9.1</span>
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
            <br></br>

            <div className="card m-4" style={{ width: '15rem' }}>
                <img src="https://thegirlonbloor.com/wp-content/uploads/2019/04/Meal-Prep-Chicken-Enchiladas-Verdes-6.jpg" alt="Chicken Enchiladas" className="card-img-top" height="150"></img>
                <div className="card-body">
                    <a href="https://www.budgetbytes.com/easiest-burrito-bowl-meal-prep/" style={{ color: "goldenrod" }}>Chicken Enchiladas</a>
                    <p className="card-text small">Submitted by ____</p>
                    <span style={{ color: "brown" }}>Rating: 7.4</span>
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

        </main>
    </div>
  );
}