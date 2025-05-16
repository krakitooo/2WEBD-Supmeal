import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [randomMeals, setRandomMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRandomMeals() {
      try {
        const meals = [];
        for (let i = 0; i < 8; i++) {
          const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/random.php"
          );
          const data = await response.json();
          if (
            data.meals?.[0] &&
            !meals.find((m) => m.idMeal === data.meals[0].idMeal)
          ) {
            meals.push(data.meals[0]);
          }
        }
        setRandomMeals(meals);
      } catch (error) {
        console.error("Error fetching random meals:", error);
      }
    }

    async function fetchCategories() {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
        );
        const data = await response.json();
        setCategories(data.meals || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    async function fetchAreas() {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        const data = await response.json();
        setAreas(data.meals || []);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    }

    Promise.all([fetchRandomMeals(), fetchCategories(), fetchAreas()]).finally(
      () => setLoading(false)
    );
  }, []);

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  const handleAreaClick = (area) => {
    navigate(`/category/${area}`);
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
      <div className="text-center">
        <h1 className="title">Discover Delicious Recipes</h1>
      </div>

      <div className="container">
        <h2 className="subtitle">Trending Meals</h2>
        <div className="grid">
          {randomMeals.map((meal) => (
            <div
              key={meal.idMeal}
              className="card"
              onClick={() => handleRecipeClick(meal.idMeal)}
            >
              <div className="card-image">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              </div>
              <div className="card-content">
                <h3 className="card-title">{meal.strMeal}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="home-sections">
          <div className="home-section">
            <h2 className="subtitle">Explore by Category</h2>
            <div className="button-grid">
              {categories.map((category) => (
                <button
                  key={category.strCategory}
                  className="btn"
                  onClick={() => handleCategoryClick(category.strCategory)}
                >
                  {category.strCategory}
                </button>
              ))}
            </div>
          </div>

          <div className="home-section">
            <h2 className="subtitle">Explore by Region</h2>
            <div className="button-grid">
              {areas.map((area) => (
                <button
                  key={area.strArea}
                  className="btn"
                  onClick={() => handleAreaClick(area.strArea)}
                >
                  {area.strArea}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
