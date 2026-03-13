import React from 'react';
import RecipeCard from './RecipeCard';
import '../app.css';

export function Main({ userName }) {
    const [showModal, setShowModal] = React.useState(false);
    const [input1, setInput1] = React.useState(localStorage.getItem('newRecipeName') || '');
    const [input2, setInput2] = React.useState(localStorage.getItem('newRecipeLink') || '');
    const [input3, setInput3] = React.useState(localStorage.getItem('newImgLink') || '');
    const [recipes, setRecipes] = React.useState([]);

    function displayModal() {
        setShowModal(true)
    }

    const submitRecipe = async () => {
        const recipe = {
            title: input1,
            link: input2,
            rating: "N/A",
            imgSrc: input3,
            userName: userName,
        };

        const response = await fetch('/api/recipes', {
            method: 'POST',
            headers: {
                'Content/type': 'application/json',
            },
            body: JSON.stringify(recipe),
        });

        const savedRecipe = await response.json();

        setRecipes((prev) => [...prev, savedRecipe]);
    }

    React.useEffect(() => {
        async function loadRecipes() {
            const response = await fetch('/api/recipes');
            const data = await response.json();
            setRecipes(data);
        }
        loadRecipes();
    }, []);


return (
    <div>
        <main id="main_" className="d-flex justify-content-center flex-wrap">
            <div>
                {recipes.map((recipe) => (
                    <RecipeCard 
                    key={recipe.id}
                    title={recipe.title}
                    link={recipe.link}
                    rating={recipe.rating}
                    imgSrc={recipe.imgSrc}
                    userName={userName}
                    />
                ))}
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
                            <input
                                type="text"
                                placeholder="Image Link"
                                value={input2}
                                onChange={(e) => setInput3(e.target.value)}
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
                    <button type="button" className="btn btn-dark" onClick={() => {submitRecipe(); setShowModal(false); setInput1(''); setInput2(''); setInput3('');}}>
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