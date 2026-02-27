import React from 'react';
import RecipeCard from './RecipeCard';
import '../app.css';

export function Main({ userName }) {
    const [showModal, setShowModal] = React.useState(false);
    const [input1, setInput1] = React.useState(localStorage.getItem('newRecipeName') || '');
    const [input2, setInput2] = React.useState(localStorage.getItem('newRecipeLink') || '');

    function displayModal() {
        setShowModal(true)
    }

    const saveInputs = () => {
        localStorage.setItem('newRecipeName', input1);
        localStorage.setItem('newRecipeLink', input2);
    }


return (
    <div>
        <main id="main_" className="d-flex justify-content-center">
            <div>

                <RecipeCard 
                title="Burrito Bowl" 
                link="https://www.budgetbytes.com/easiest-burrito-bowl-meal-prep/" 
                rating="8.7" 
                imgSrc="https://www.budgetbytes.com/wp-content/uploads/2018/04/Easiest-Burrito-Bowl-Meal-Prep-V3.jpg"
                userName={userName}
                />

            </div>
            <br></br>

            <div>

                <RecipeCard
                title="Spicy Salmon"
                link="https://girlheartfood.com/spicy-salmon-rice-bowl-recipe/"
                rating="9.1"
                imgSrc="https://girlheartfood.com/wp-content/uploads/2021/09/Salmon-Rice-Bowl-2.jpg"
                userName={userName}
                />

            </div>
            <br></br>

            <div>

                <RecipeCard
                title="Chicken Enchiladas"
                link="https://thegirlonbloor.com/meal-prep-chicken-enchiladas-verdes/"
                rating="7.4"
                imgSrc="https://thegirlonbloor.com/wp-content/uploads/2019/04/Meal-Prep-Chicken-Enchiladas-Verdes-6.jpg"
                userName={userName}
                />

            </div>

        </main>
        <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#exampleModalCenter" onClick={(e) => displayModal(e)}>
        Submit New Recipe
        </button>

        {showModal && (
             <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
                aria-modal="true"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title">New Recipe Info:</h5>
                    </div>

                    <div className="modal-body">
                    
                        <div className="actions">
                            <input
                                type="text"
                                placeholder="Name"
                                value={input1}
                                onChange={(e) => setInput1(e.target.value)}
                                className="modal-input"
                            />
                            <input
                                type="text"
                                placeholder="Link"
                                value={input2}
                                onChange={(e) => setInput2(e.target.value)}
                                className="modal-input"
                            />
                        </div>

                    </div>

                    <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                    <button type="button" className="btn btn-dark" onClick={() => {saveInputs(); setShowModal(false); setInput1(''); setInput2('');}}>
                        Submit
                    </button>
                    </div>
                </div>
                </div>
            </div>
        )} 
    </div>
    </div>
  );
}