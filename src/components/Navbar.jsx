import { useState } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          SUPMEAL
        </NavLink>

        <button
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className="navbar-links desktop-nav">
          <NavLink to="/all-meals" className="nav-link">
            All Recipes
          </NavLink>
          <NavLink to="/advanced-search" className="nav-link">
            Advanced Search
          </NavLink>
        </div>

        <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
          <NavLink
            to="/all-meals"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            All Recipes
          </NavLink>
          <NavLink
            to="/advanced-search"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Advanced Search
          </NavLink>
        </div>

        <SearchBar />
      </div>
    </nav>
  );
}

export default Navbar;
