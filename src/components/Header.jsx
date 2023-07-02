// Header.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartProvider';
import '../styles/Header.css';

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const [popularMoviesId, setPopularMoviesId] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1`)
      .then(response => response.json())
      .then(data => setPopularMoviesId(data.id))
      .catch(error => console.error(error));
  }, []);

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__title">Movie App</Link>
        <nav>
          <ul className="header__nav">
            <li><Link to="/popular-movies">Popular Movies</Link></li>
            <li className="dropdown">
              <a href="#">Genres</a>
              <ul className="dropdown-content">
                {genres.map(genre => (
                  <li key={genre.id}>
                    <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li><Link to="/about">About</Link></li> {/* Add the link for the About page */}
            <li><Link to="/contact">Contact</Link></li> {/* Add the link for the Contact page */}
          </ul>
        </nav>
      </div>
      <div className="header__cart">
        <Link to="/cart" className="header-cart-button">
          <span className="header-cart-count">{cartItems.length}</span>
          <span role="img" aria-label="shopping-cart" className="header-cart-symbol">🛒</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;