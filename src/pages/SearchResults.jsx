import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("s") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    async function fetchResults() {
      setLoading(true);
      setResults([]);

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        const data = await response.json();
        setResults(data.meals || []);
      } catch (error) {
        console.error("Erreur lors de la recherche rapide", error);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="py-8">
      <h1 className="title">Résultats pour "{query}"</h1>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid">
          {results.map((meal) => (
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
      ) : (
        <p className="text-center text-secondary">
          Aucun résultat trouvé pour "{query}".
        </p>
      )}
    </div>
  );
}

export default SearchResults;
