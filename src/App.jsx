import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://www.omdbapi.com';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const randomKeywords = [
  'star', 'love', 'life', 'war', 'dark', 'king', 'dream', 'hero',
  'night', 'world', 'fire', 'day', 'girl', 'man', 'agent', 'mission',
  'ghost', 'city', 'power', 'future'
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async (query = 'batman') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const searchEndpoint = `${API_BASE_URL}/?apikey=${API_KEY}&s=${query}`;
      const searchResponse = await fetch(searchEndpoint);
      const searchData = await searchResponse.json();

      if (searchData.Response === 'False') {
        setErrorMessage(searchData.Error || 'No movies found.');
        setMovieList([]);
        return;
      }

      const detailedMovies = await Promise.all(
        searchData.Search.map(async (movie) => {
          const detailEndpoint = `${API_BASE_URL}/?apikey=${API_KEY}&i=${movie.imdbID}`;
          const detailResponse = await fetch(detailEndpoint);
          const detailData = await detailResponse.json();
          return detailData;
        })
      );

      setMovieList(detailedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Error fetching movies. Please try again later.');
      setMovieList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      fetchMovies(searchTerm);
    }
  };

  useEffect(() => {
    const randomKeyword = randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
    fetchMovies(randomKeyword);
  }, []);

  return (
    <main className="bg-[url('/BG.png')] bg-cover bg-center bg-no-repeat min-h-screen"> 
      <div className='pattern' />
      <div className='wrapper'>
        <header className="p-8">
          <img src="./hero-img.png" alt='Hero Banner' className="mx-auto -translate-y-8 transform"></img>
          <h1>
            Find <span className='text-gradient'>Movies</span> You'll enjoy browsing without any hassle.
          </h1>
          <form onSubmit={handleSearch}>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </form>
        </header>

        <section className='all-movies'>
          <h2 className='mt-[20px] text-white text-xl font-semibold'>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500 mt-4">{errorMessage}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
              {movieList.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;