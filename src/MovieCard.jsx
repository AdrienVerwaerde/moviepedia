import React, { useState, useEffect } from 'react';

const MovieCard = ({ movie }) => {
    const [plot, setPlot] = useState('');

    useEffect(() => {
        const fetchPlot = async () => {
            try {
                const response = await fetch(`${'https://www.omdbapi.com/?apikey=d25ba319'}&i=${movie.imdbID}`);
                const data = await response.json();
                setPlot(data.Plot || 'No plot available.');
            } catch (error) {
                console.error('Error fetching plot:', error);
            }
        };

        fetchPlot();
    }, [movie.imdbID]);

    return (
        <div className="movie">
            <div>
                <h3>{movie.Year}</h3>
                <br></br>
                <p>{plot}</p>
            </div>
            <div>
                <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    );
};

export default MovieCard;
