import React from 'react';
import RecipeCard from './RecipeCard';

export function Main() {
  return (
    <div>
        <main id="main_" className="d-flex justify-content-center">
            <div>

                <RecipeCard 
                title="Burrito Bowl" 
                link="https://www.budgetbytes.com/easiest-burrito-bowl-meal-prep/" 
                rating="8.7" 
                imgSrc="https://www.budgetbytes.com/wp-content/uploads/2018/04/Easiest-Burrito-Bowl-Meal-Prep-V3.jpg"
                />

            </div>
            <br></br>

            <div>

                <RecipeCard
                title="Spicy Salmon"
                link="https://girlheartfood.com/spicy-salmon-rice-bowl-recipe/"
                rating="9.1"
                imgSrc="https://girlheartfood.com/wp-content/uploads/2021/09/Salmon-Rice-Bowl-2.jpg"
                />

            </div>
            <br></br>

            <div>

                <RecipeCard
                title="Chicken Enchiladas"
                link="https://thegirlonbloor.com/meal-prep-chicken-enchiladas-verdes/"
                rating="7.4"
                imgSrc="https://thegirlonbloor.com/wp-content/uploads/2019/04/Meal-Prep-Chicken-Enchiladas-Verdes-6.jpg"
                />

            </div>
        </main>
    </div>
  );
}