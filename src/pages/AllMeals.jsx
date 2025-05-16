import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllMeals() {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const mealsPerPage = 10;

  useEffect(() => {
    async function fetchAllMeals() {
      try {
        let allMeals = [];
        const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

        for (const letter of alphabet) {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
          );
          const data = await response.json();
          if (data.meals) {
            allMeals = allMeals.concat(data.meals);
          }
        }

        allMeals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
        setMeals(allMeals);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllMeals();
  }, []);

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

  const totalPages = Math.ceil(meals.length / mealsPerPage);

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="py-8">
      <h1 className="title">All Recipes (A-Z)</h1>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="grid">
            {currentMeals.map((meal) => (
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

          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn"
            >
              Previous
            </button>
            <span className="pagination-text">
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="btn"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AllMeals;
