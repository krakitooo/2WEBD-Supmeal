import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdvancedSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("i");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) {
      alert("Please enter a search term.");
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?${searchType}=${query}`;
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.meals || []);
    } catch (error) {
      console.error("Error during advanced search:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="py-8">
      <h1 className="title">Advanced Search</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Enter your search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input"
        />

        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              value="i"
              checked={searchType === "i"}
              onChange={(e) => setSearchType(e.target.value)}
            />
            <span>Ingredient</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              value="c"
              checked={searchType === "c"}
              onChange={(e) => setSearchType(e.target.value)}
            />
            <span>Category</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              value="a"
              checked={searchType === "a"}
              onChange={(e) => setSearchType(e.target.value)}
            />
            <span>Region</span>
          </label>
        </div>

        <button onClick={handleSearch} className="btn">
          Search
        </button>
      </div>

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
        !loading && (
          <p className="text-center text-secondary">No results found.</p>
        )
      )}
    </div>
  );
}

export default AdvancedSearch;
