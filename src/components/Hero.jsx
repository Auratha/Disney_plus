import playLogo from "../assets/icons/play.svg";

const Hero = ({ handlePlayVideo, movieInfo }) => {
  const { title, overview, backdrop_path, name } = movieInfo || {};
  const imgPath = `https://image.tmdb.org/t/p/w1280/${backdrop_path}`;

  return (
    <div className="overflow-hidden">
      <div className="w-full h-screen xs:h-[65vh] sm:h-[75vh] md:h-[90vh] relative">
        <div className="w-full h-full absolute bottom-0 bg-gradient-to-t from-[#1a1d29] to-transparent"></div>
        <img src={imgPath} className="w-full h-full object-cover" />
        <div className="w-1/2 xs:w-full xs:mt-16 sm:w-full sm:mt-16 md:w-[80%] md:mt-10 lg:w-[70%] lg:mt-5 px-10 absolute top-[50%] translate-y-[-50%] text-white">
          <h1 className="text-6xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl">
            {name ? name : title}
          </h1>
          <p className="text-xl xs:text-xs sm:text-sm md:text-md lg:text-lg mt-10">
            {overview}
          </p>
          <div className="flex space-x-5 mt-8">
            <button
              className="flex px-2 py-1 bg-white cursor-pointer"
              onClick={handlePlayVideo}
            >
              <img src={playLogo} alt="play" />{" "}
              <span className="text-black ml-2">Play Trailer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
