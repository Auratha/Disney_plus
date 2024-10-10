import infoLogo from "../assets/icons/info.svg";
import { fetchTrendingMovies } from "../API/TMDP";
import { useEffect, useState } from "react";
import truncateTitle from "../function/truncate";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [movieInfo, setMovieInfo] = useState(null);
  const [mainMovie, setMainMovie] = useState([]);
  const fivePopularMovies = movieInfo?.slice(1, 6) || [];
  const navigate = useNavigate();

  const loadTrendingMovies = async () => {
    try {
      const trendingMovies = await fetchTrendingMovies();
      setMovieInfo(trendingMovies);
      setMainMovie(trendingMovies[0]);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const changeMoviePoster = async (id) => {
    await setTimeout(() => {
      setMainMovie(movieInfo?.find((movie) => movie.id === id));
    }, 1000);
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToDetailPage = (id) => {
    navigate(`/Disney_plus/show/movie/${id}`);
  };

  return (
    <div>
      <div className="w-full h-[40rem] xs:h-[25rem] sm:h-[30rem] md:h-[40rem] relative">
        <div className="w-full h-full absolute bottom-0 bg-gradient-to-t from-[#1a1d29] to-transparent"></div>
        <img
          src={`https://image.tmdb.org/t/p/w1280/${mainMovie?.backdrop_path}`}
          className="w-full h-full object-cover"
        />
        <div className="w-[60%] xs:w-full xs:mt-16 sm:w-full sm:mt-16 md:w-[80%] md:mt-10 lg:w-[70%] lg:mt-5 px-10 absolute top-[40%] translate-y-[-40%] text-white">
          <h1 className="text-7xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl">
            {truncateTitle(mainMovie?.original_title, 12)}
          </h1>
          <p className="text-lg xs:text-xs sm:text-sm md:text-md lg:text-lg mt-4">
            {mainMovie?.overview}
          </p>
          <div className="flex space-x-5 mt-8">
            <button className="flex px-2 py-1 bg-green-400  text-black border-[1px] border-white cursor-pointer">
              <img src={infoLogo} alt="info" />{" "}
              <span
                className="ml-2"
                onClick={() => goToDetailPage(mainMovie?.id)}
              >
                About Movie
              </span>
            </button>
          </div>
        </div>
        <div className="absolute bottom-3 xs:hidden sm:hidden md:hidden lg:hidden">
          <div className="mx-10 grid grid-cols-5 gap-10 ">
            {fivePopularMovies.map((movie) => {
              return (
                <img
                  src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                  key={movie.id}
                  className=" rounded-3xl w-full h-full object-cover hover-scale cursor-pointer"
                  onMouseOver={() => changeMoviePoster(movie.id)}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-[#1a1d29] h-[3rem] w-full"></div>
      <div className="bg-[#1a1d29] hidden xs:block sm:block md:block lg:block pb-10">
        <div className="mx-10 grid grid-cols-5 gap-10 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ">
          {fivePopularMovies.map((movie) => {
            return (
              <img
                src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                key={movie.id}
                className=" rounded-3xl w-full h-full object-cover hover-scale cursor-pointer"
                onClick={() => changeMoviePoster(movie.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
