// MovieCart.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartProvider';
import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, release_date } = movie;
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const releaseYear = new Date(release_date).getFullYear();
    const price = calculatePrice(releaseYear);
    addToCart({ ...movie, poster_path, price });
  };

  const calculatePrice = (releaseYear) => {
    const currentYear = new Date().getFullYear();
    const yearsAgo = currentYear - releaseYear;

    if (yearsAgo <= 1) {
      return 19.99;
    } else if (yearsAgo <= 3) {
      return 14.99;
    } else if (yearsAgo <= 6) {
      return 9.99;
    } else {
      return 6.99;
    }
  };

  return (
    <div className="movie-card-container">
      <div className="movie-card">
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
      </div>
      <div className="button-container">
        <button className="round-button cart-button" onClick={handleAddToCart}>
          🛒
        </button>
        <Link to={`/movies/${id}`} className="round-button info-button">
          ℹ️
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
