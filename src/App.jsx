import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use';

import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [movieList  , setmovieList  ] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = '') => {

    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
      ?`${API_BASE_URL}/search/movie?query=${query}` 
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok) {
        throw new Error('Failed');
      }
      const data = await response.json();
      
      if( data.Response === 'False'){
        setErrorMessage(data.error || 'Failed');
        setmovieList([]);
        return;
      }

      setmovieList(data.results || []);

    } catch(e){
      console.error(`Erros fetching movies: ${e}`);
      setErrorMessage('Error fetching movies. Please try agains later.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm ]);
  

  return (
    <div className='pattern'>
     <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="banner" />
          <h1> <span className='text-gradient'> Find Movies</span> You'll Enjoy Without The Hassle</h1>
          <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />
        </header>

        <section className='all-movies'>
          <h2 className='mt-[30px]'>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie = {movie} />
              ))}
            </ul>
          )
        
        }

          {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        </section>
     </div>
    </div>
  )
} 
export default App
