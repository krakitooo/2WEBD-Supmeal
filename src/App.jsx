import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllMeals from "./pages/AllMeals";
import AdvancedSearch from "./pages/AdvancedSearch";
import SearchResults from "./pages/SearchResults";
import RecipeDetail from "./components/RecipeDetail";
import CategoryRecipes from "./pages/CategoryRecipes";
import AreaRecipes from "./pages/AreaRecipes";
import AreaRecipes from "./pages/AreaRecipes";

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
            <Route path="/area/:area" element={<AreaRecipes />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
