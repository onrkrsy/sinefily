import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const getMovieRequest = async (searchValue) => {
    const url = "http://www.omdbapi.com/?s=" + searchValue + "&apikey=585975cb";
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);
  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("raact-movie-app-favourites")
    );
    setFavourites(movieFavourites);
  },[]);

  const AddFavouriteMovie = (movie) => {
    const newfavouriteList = [...favourites, movie];
    setFavourites(newfavouriteList);
    saveToLocalStorage(newfavouriteList);
  };
  const saveToLocalStorage = (items) => {
    localStorage.setItem("raact-movie-app-favourites", JSON.stringify(items));
  };

  const removeFavouriteMovie = (movie) => {
    const newfavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newfavouriteList);
    saveToLocalStorage(newfavouriteList);
  };
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Fimler" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavouritesClick={AddFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorilerim" />
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;
