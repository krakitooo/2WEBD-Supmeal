import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AreaRecipes() {
  const { area } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAreaRecipes() {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
        );
        const data = await response.json();
        setRecipes(data.meals || []);
      } catch (error) {
        console.error("Error fetching area recipes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAreaRecipes();
  }, [area]);

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="title">{area} Cuisine</h1>

      {recipes.length > 0 ? (
        <div className="grid">
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="card"
              onClick={() => handleRecipeClick(recipe.idMeal)}
            >
              <div className="card-image">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              </div>
              <div className="card-content">
                <h3 className="card-title">{recipe.strMeal}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-secondary">
          No recipes found for {area} cuisine.
        </p>
      )}
    </div>
  );
}

export default AreaRecipes;
