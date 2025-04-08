import { useState, useEffect } from 'react'
import { useDebounce} from "react-use";
import './App.css'
import Navbar from "./components/Navbar.jsx";
import Search from "./components/Search.jsx";
import MovieCard from "./components/MovieCard.jsx";
import Spinner from "./components/Spinner.jsx";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${API_KEY}`,
    }
}

function App() {
    const [searchInput  , setSearchInput] = useState("");
    const [debounceSearchInput, setDebounceSearchInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [trendingMoviesErrorMessage, setTrendingMoviesErrorMessage] = useState("");
    const [isLoadingTrending, setIsLoadingTrending] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const[trendingMovies, setTrendingMovies] = useState([]);

    useDebounce(() => setDebounceSearchInput(searchInput), 1500, [searchInput]);

    const loadTrendingMovies = async () => {
        setIsLoadingTrending(true)
        try {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);
        }
        catch (error) {
            console.log(`Error fetching trending movies: ${error}`);
            setTrendingMoviesErrorMessage("Error fetching trending movies: " + error.message);
        }
        finally {
            setIsLoadingTrending(false);
        }
    }
    const fetchMovies = async  (query = '') => {
        setIsLoading(true);

        try {
            const endpoint =  query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error(`Error fetching movies`);
            }
            const data = await response.json();

            if(data.Response === 'false') {
                setErrorMessage(data.Error || 'Error Fetching movies');
                setMovieList([]);
                return;
            }
            setMovieList(data.results);

            if(query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }
        }
        catch (error) {
            // console.log(`Error fetching movies: ${error}`);
            console.log(error);
            setErrorMessage('Error fetching movies, please try again.');
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadTrendingMovies();
    }, []);

    useEffect(() => {
        fetchMovies(debounceSearchInput);
    }, [debounceSearchInput]);


  return (
    <main>
        <div className="pattern" />

        <div className="wrapper">

            <Navbar />

        <header className="header">
            <img src="/hero.png" alt="Hero Banner" />
            <h1 className="title">Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>

            <Search searchInput={searchInput} setSearchInput={setSearchInput} />
        </header>

            <section className="trending">
                <h2>Trending Movies</h2>

            { isLoadingTrending ?
                ( <Spinner /> )
                : trendingMoviesErrorMessage
                    ? (<p className='text-red-500 mx-auto'>{errorMessage}</p>)
                    : trendingMovies.length > 0
                    && (

                    <ul>
                        {trendingMovies.map((movie, index) => (
                            <li key={movie.$id}>
                                <p>{index + 1}</p>
                                <img src={movie.poster_url} alt={movie.title} />
                            </li>
                        ))}
                    </ul>
            )}
                </section>


        <section className="all-movies">
            <h2>All Movies</h2>

            { isLoading ? (
                <Spinner />
            ) : errorMessage ? (
                <p className='text-red-500 mx-auto'>{errorMessage}</p>
            ): (
                <ul>
                    {movieList.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            )}
        </section>

        </div>
    </main>
  )
}

export default App
