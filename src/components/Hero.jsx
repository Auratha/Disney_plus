import playLogo from "../assets/icons/play.svg";

const Hero = ({ handlePlayVideo, movieInfo }) => {
  const { title, overview, backdrop_path, name } = movieInfo || {};
  const imgPath = `https://image.tmdb.org/t/p/w1280/${backdrop_path}`;

  return (
    <div className="overflow-hidden">
      <div className="w-full h-screen relative">
        <div className="w-full h-full absolute bottom-0 bg-gradient-to-t from-[#1a1d29] to-transparent"></div>
        <img src={imgPath} className="w-full h-full object-cover" />
        <div className="w-1/2 px-10 absolute top-[50%] translate-y-[-50%] text-white">
          <h1 className="text-6xl">{name ? name : title}</h1>
          <p className="text-xl mt-10">{overview}</p>
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
