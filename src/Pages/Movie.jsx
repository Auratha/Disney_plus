import infoLogo from "../assets/icons/info.svg";
import Carousel from "../components/Carousel";
import { fetchMovies, fetchMoviesByGenre } from "../API/TMDP";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Movie = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState({
    latest: [],
    action: [],
    animation: [],
    fantasy: [],
  });

  const loadMovies = async () => {
    const fetchedMovies = await fetchMovies("movie");
    const checkPosters = fetchedMovies.filter(
      (item) => item.backdrop_path !== null
    );
    setMovies((prev) => ({ ...prev, latest: checkPosters }));
  };

  const loadMoviesByGenre = async (genreId) => {
    const fetchedMovies = await fetchMoviesByGenre(genreId, "movie");
    if (genreId === 28) {
      setMovies((prev) => ({ ...prev, action: fetchedMovies }));
    } else if (genreId === 16) {
      setMovies((prev) => ({ ...prev, animation: fetchedMovies }));
    } else if (genreId === 14) {
      setMovies((prev) => ({ ...prev, fantasy: fetchedMovies }));
    }
  };

  useEffect(() => {
    loadMovies();
    loadMoviesByGenre(28);
    loadMoviesByGenre(16);
    loadMoviesByGenre(14);
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="w-full h-full xs:h-[25rem] sm:h-[30rem] md:h-[40rem]  relative">
        <div className="w-full h-full absolute bottom-0 bg-gradient-to-t from-[#1a1d29] to-transparent"></div>
        <img
          src={`https://image.tmdb.org/t/p/w1280/${movies.latest[0]?.backdrop_path}`}
          className="w-full h-full object-cover"
        />
        <div className="w-1/2 xs:w-full xs:mt-16 sm:w-full sm:mt-16 md:w-[80%] md:mt-10 lg:w-[70%] lg:mt-5 px-10 absolute top-[50%] translate-y-[-50%] text-white">
          <h1 className="text-8xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl">
            {movies.latest[0]?.original_title}
          </h1>
          <p className="text-xl xs:text-xs sm:text-sm md:text-md lg:text-lg mt-8">
            {movies.latest[0]?.overview}
          </p>
          <div className="flex space-x-5 mt-8">
            <button className="flex px-2 py-1 bg-green-400 text-black border-[1px] border-white cursor-pointer">
              <img src={infoLogo} alt="info" />{" "}
              <span
                className="ml-2"
                onClick={() => navigate(`/show/movie/${movies.latest[0]?.id}`)}
              >
                About Movie
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#1a1d29] py-10">
        <div className="mb-10">
          <h1 className="text-white text-2xl mb-2 mx-10">Lastest</h1>
          <Carousel data={movies.latest} type={"movie"} />
        </div>
        <div className="mb-10">
          <h1 className="text-white text-2xl mb-2 mx-10">Action</h1>
          <Carousel data={movies.action} type={"movie"} />
        </div>
        <div className="mb-10">
          <h1 className="text-white text-2xl mb-2 mx-10">Animation</h1>
          <Carousel data={movies.animation} type={"movie"} />
        </div>
        <div className="">
          <h1 className="text-white text-2xl mb-2 mx-10">Fantasy</h1>
          <Carousel data={movies.fantasy} type={"movie"} />
        </div>
      </div>
    </div>
  );
};

export default Movie;
