import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com/?apikey=1b68ee50';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filmNotFound, setFilmNotFound] = useState(false);

    useEffect(() => {
        searchMovies("");
    }, []);

    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();

            if (data.Response === 'True') {
                setMovies(data.Search);
                setFilmNotFound(false);
            } else {
                setMovies([]);
                setFilmNotFound(true);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchMovies(searchTerm);
        }
    };

    const handleTitleClick = () => {
        searchMovies("");
        setSearchTerm("");
    };

    return (<div className="app">
        <button className="button-title" onClick={handleTitleClick}><h1>Moviepedia</h1></button>

        <div className="search">
            <input
                placeholder="Rechercher un film"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <img
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
            />
        </div>
        {
            movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>L'encyclopédie cinématographique que le monde attendait</h2>
                    </div>
                )
        }
    </div>
    );
}

export default App;
