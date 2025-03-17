import { useEffect, useState } from 'react'

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

  const [searchTerm, setSearchTeam] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [movieList  , setmovieList  ] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {

    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

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
    fetchMovies();
  }, [ ]);
  

  return (
    <div className='pattern'>
     <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="banner" />
          <h1> <span className='text-gradient'> Find Movies</span> You'll Enjoy Without The Hassle</h1>
          <Search searchTerm = {searchTerm} setSearchTeam = {setSearchTeam} />
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
