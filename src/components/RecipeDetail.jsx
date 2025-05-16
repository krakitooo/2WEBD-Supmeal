import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipeDetails() {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        if (data.meals) {
          setRecipe(data.meals[0]);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center">
        <h2 className="title">Recipe not found</h2>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="recipe-detail">
      <div className="recipe-hero">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-hero-image"
        />
        <div className="recipe-hero-overlay">
          <h1 className="recipe-hero-title">{recipe.strMeal}</h1>
        </div>
      </div>

      <div className="recipe-section">
        <h2 className="recipe-section-title">Category</h2>
        <div className="ingredient-item">{recipe.strCategory}</div>
      </div>

      <div className="recipe-section">
        <h2 className="recipe-section-title">Ingredients</h2>
        <div className="recipe-ingredients">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-item">
              {ingredient}
            </div>
          ))}
        </div>
      </div>

      <div className="recipe-section">
        <h2 className="recipe-section-title">Instructions</h2>
        <p className="text-secondary">{recipe.strInstructions}</p>
      </div>

      {recipe.strYoutube && (
        <div className="recipe-section">
          <h2 className="recipe-section-title">Video Tutorial</h2>
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;
