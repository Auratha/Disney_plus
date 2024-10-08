import { useRef, useEffect, useState } from "react";
import Hero from "../components/Hero";
import { useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchYoutubeKey,
  fetchMoviesByGenre,
} from "../API/TMDP";
import { useNavigate } from "react-router-dom";

const ShowDetail = () => {
  const iframeRef = useRef(null);
  const { type, id } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const [similar, setSimilar] = useState(null);
  const navigate = useNavigate();

  const loadMoviesDetails = async (id) => {
    const data = await fetchMovieDetails(id, type);
    setMovieInfo(data);
  };

  const loadYoutubeKey = async (id) => {
    const data = await fetchYoutubeKey(id, type);
    setMovieInfo((prev) => ({ ...prev, key: data }));
  };

  const loadMoviesByGenre = async (genreId) => {
    const data = await fetchMoviesByGenre(genreId, type, 8);
    setSimilar(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadMoviesDetails(id);
  }, [id]);

  useEffect(() => {
    if (movieInfo && !movieInfo.key) {
      loadYoutubeKey(id);
      loadMoviesByGenre(movieInfo?.genres[0].id);
    }
  }, [movieInfo, id]);

  const trailerFullScreen = () => {
    if (iframeRef.current) {
      iframeRef.current.requestFullscreen();
    }
  };

  return (
    <div>
      <Hero handlePlayVideo={trailerFullScreen} movieInfo={movieInfo} />
      <div className="bg-[#1a1d29] px-10 py-5 mx-auto ">
        <h1 className="mb-10 text-5xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-white text-center">
          Trailer
        </h1>
        <div className="w-[80%] md:w-[90%] xs:w-full h-auto relative aspect-video mx-auto">
          <iframe
            ref={iframeRef}
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${movieInfo?.key}`}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          {movieInfo?.key == null && (
            <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center text-white text-5xl xs:text-2xl ">
              Video is not available
            </div>
          )}
        </div>
        <div className="mt-10 py-10">
          <h1 className="text-5xl text-white text-center">Similarity</h1>
          <div className="grid grid-cols-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {similar
              ?.filter((movie) => movie.id !== id)
              .map((movie) =>
                movie.backdrop_path !== null ? (
                  <img
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                    onClick={() => {
                      navigate(`/Disney_plus/show/${type}/${movie.id}`);
                      window.scrollTo(0, 0);
                    }}
                    className="w-full h-full rounded-3xl cursor-pointer hover:scale-105 transition-all duration-300"
                  />
                ) : null
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetail;
