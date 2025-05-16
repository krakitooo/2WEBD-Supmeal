import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllMeals from "./pages/AllMeals";
import AdvancedSearch from "./pages/AdvancedSearch";
import SearchResults from "./pages/SearchResults";
import RecipeDetail from "./components/RecipeDetail";
import CategoryRecipes from "./pages/CategoryRecipes";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-meals" element={<AllMeals />} />
            <Route path="/advanced-search" element={<AdvancedSearch />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/category/:category" element={<CategoryRecipes />} />
            <Route
              path="*"
              element={
                <div className="text-center">
                  <h1 className="title">404</h1>
                  <p className="text-secondary">Page non trouvée</p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
