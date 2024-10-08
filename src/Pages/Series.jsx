import infoLogo from "../assets/icons/info.svg";
import Carousel from "../components/Carousel";
import { fetchMovies, fetchMoviesByGenre } from "../API/TMDP";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Series = () => {
  const navigate = useNavigate();
  const [series, setSeries] = useState({
    latest: [],
    action: [],
    animation: [],
    fantasy: [],
  });

  const loadMovies = async () => {
    const fetchedMovies = await fetchMovies("series");
    const checkPosters = fetchedMovies.filter(
      (item) => item.backdrop_path !== null
    );
    setSeries((prev) => ({ ...prev, latest: checkPosters }));
  };

  const loadMoviesByGenre = async (genreId) => {
    const fetchedMovies = await fetchMoviesByGenre(genreId, "series");
    if (genreId === 9648) {
      setSeries((prev) => ({ ...prev, action: fetchedMovies }));
    } else if (genreId === 16) {
      setSeries((prev) => ({ ...prev, animation: fetchedMovies }));
    } else if (genreId === 10765) {
      setSeries((prev) => ({ ...prev, fantasy: fetchedMovies }));
    }
  };

  // console.log(series);

  useEffect(() => {
    loadMovies();
    loadMoviesByGenre(9648);
    loadMoviesByGenre(16);
    loadMoviesByGenre(10765);
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="w-full h-screen xs:h-[65vh] sm:h-[60vh] md:h-[90vh] relative">
        <div className="w-full h-full absolute bottom-0 bg-gradient-to-t from-[#1a1d29] to-transparent"></div>
        <img
          src={`https://image.tmdb.org/t/p/w1280/${series.latest[0]?.backdrop_path}`}
          className="w-full h-full object-cover"
        />
        <div className="w-1/2 w-[60%] xs:w-full xs:mt-16 sm:w-full sm:mt-16 md:w-[80%] md:mt-10 lg:w-[70%] lg:mt-5 px-10 absolute top-[50%] translate-y-[-50%] text-white">
          <h1 className="text-8xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl">
            {series.latest[0]?.original_name}
          </h1>
          <p className="text-xl text-xl xs:text-xs sm:text-sm md:text-md lg:text-lg mt-8 mt-8">
            {series.latest[0]?.overview}
          </p>
          <div className="flex space-x-5 mt-8">
            <button className="flex px-2 py-1 bg-green-400 text-black border-[1px] border-white cursor-pointer">
              <img src={infoLogo} alt="info" />{" "}
              <span
                className="ml-2"
                onClick={() => navigate(`/show/tv/${series.latest[0]?.id}`)}
              >
                About Series
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#1a1d29] py-10">
        <div className="mb-10">
          <h1 className="text-white text-2xl mb-2 mx-10">Lastest</h1>
          <Carousel data={series.latest} />
        </div>
        <div className="mb-10">
          <h1 className="text-white text-2xl mb-2 mx-10">Mystery</h1>
          <Carousel data={series.action} />
        </div>
        <div className="mb-10">
          <h1 className="text-white text-2xl mb-2 mx-10">Animation</h1>
          <Carousel data={series.animation} />
        </div>
        <div className="">
          <h1 className="text-white text-2xl mb-2 mx-10">Sci-Fi & Fantasy</h1>
          <Carousel data={series.fantasy} />
        </div>
      </div>
    </div>
  );
};

export default Series;
