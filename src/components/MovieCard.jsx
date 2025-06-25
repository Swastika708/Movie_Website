
import React from 'react';

const MovieCard = ({ movie }) => {
  const {
    Title,
    Poster,
    Year,
    imdbRating,
    imdbID,
    Language
  } = movie;

  return (
    <div className="movie-card bg-gray-800 rounded p-3 text-white text-center">
      <img
        src={Poster !== 'N/A' ? Poster : '/No-Poster.png'}
        alt={Title}
        className="w-full h-auto rounded mb-2"
      />
      <h3 className="text-lg font-semibold">{Title}</h3>
      <div className="flex items-center justify-center text-sm text-gray-300 gap-2 mt-1">
        <span>⭐ {imdbRating !== 'N/A' ? imdbRating : 'N/A'}</span>
        <span>•</span>
        <span>{Language?.split(',')[0] || 'N/A'}</span>
        <span>•</span>
        <span>{Year}</span>
      </div>
    </div>
  );
};

export default MovieCard;
