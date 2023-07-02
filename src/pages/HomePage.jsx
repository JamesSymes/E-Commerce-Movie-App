import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import '../styles/HomePage.css';

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    // Fetch popular movies
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1`)
      .then(response => response.json())
      .then(data => setPopularMovies(data.results.slice(0, 5)))
      .catch(error => console.error(error));

    // Fetch comedy movies
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&with_genres=35`)
      .then(response => response.json())
      .then(data => setComedyMovies(data.results.slice(0, 5)))
      .catch(error => console.error(error));

    // Fetch drama movies
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&with_genres=18`)
      .then(response => response.json())
      .then(data => setDramaMovies(data.results.slice(0, 5)))
      .catch(error => console.error(error));

    // Fetch horror movies
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&with_genres=27`)
      .then(response => response.json())
      .then(data => setHorrorMovies(data.results.slice(0, 5)))
      .catch(error => console.error(error));
  }, []);

  const handleMouseEnter = sectionName => {
    setHoveredSection(sectionName);
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);
  };

  const getGenreLink = genreId => `/genres/${genreId}`;

  return (
    <div className="page-content">
      <div
        className="section"
        onMouseEnter={() => handleMouseEnter('popular')}
        onMouseLeave={handleMouseLeave}
      >
        <h2 className="section-title">Popular Movies</h2>
        <div className="movie-list">
          {popularMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {hoveredSection === 'popular' && (
          <div className="section-link-container">
            <Link to="/popular-movies" className="section-link">&gt;</Link>
            <div className="section-link-shadow"></div>
          </div>
        )}
      </div>
      <div
        className="section"
        onMouseEnter={() => handleMouseEnter('comedy')}
        onMouseLeave={handleMouseLeave}
      >
        <h2 className="section-title">Comedy Movies</h2>
        <div className="movie-list">
          {comedyMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {hoveredSection === 'comedy' && (
          <div className="section-link-container">
            <Link to={getGenreLink(35)} className="section-link">&gt;</Link>
            <div className="section-link-shadow"></div>
          </div>
        )}
      </div>
      <div
        className="section"
        onMouseEnter={() => handleMouseEnter('drama')}
        onMouseLeave={handleMouseLeave}
      >
        <h2 className="section-title">Drama Movies</h2>
        <div className="movie-list">
          {dramaMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {hoveredSection === 'drama' && (
          <div className="section-link-container">
            <Link to={getGenreLink(18)} className="section-link">&gt;</Link>
            <div className="section-link-shadow"></div>
          </div>
        )}
      </div>
      <div
        className="section"
        onMouseEnter={() => handleMouseEnter('horror')}
        onMouseLeave={handleMouseLeave}
      >
        <h2 className="section-title">Horror Movies</h2>
        <div className="movie-list">
          {horrorMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {hoveredSection === 'horror' && (
          <div className="section-link-container">
            <Link to={getGenreLink(27)} className="section-link">&gt;</Link>
            <div className="section-link-shadow"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;


