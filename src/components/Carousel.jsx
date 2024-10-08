import { useEffect, useRef } from "react";
import truncateTitle from "../function/truncate";
import { useNavigate, useLocation } from "react-router-dom";

const Carousel = ({ data, type }) => {
  const carousel = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getMoveImageCount = () => {
    if (window.innerWidth < 640) return 1; // Mobile size: move 1 image
    if (window.innerWidth < 1024) return 3; // Tablet size: move 3 images
    return 5; // Default: move 5 images for larger screens
  };

  useEffect(() => {
    const imgWidth = carousel.current.children[0]?.children[0].clientWidth; //take 1st img width from carousel children
    const totalImg = carousel.current.children.length;
    const moveImage = getMoveImageCount();
    const gapWidth = 20;
    const moveWidth = moveImage * (imgWidth + gapWidth);
    let position = 0;

    const scroll = () => {
      position >= totalImg * imgWidth
        ? (position = 0)
        : (position += moveWidth);

      if (carousel.current) {
        carousel.current.scrollTo({
          left: position,
          behavior: "smooth",
        });
      }
    };

    // const interval = setInterval(scroll, 7000);

    // return () => clearInterval(interval);
  }, [data]);

  const goToDetailPage = (id) => {
    if (location.pathname === "/Disney_plus/movies") {
      navigate(`/Disney_plus/show/movie/${id}`);
    }

    if (location.pathname === "/Disney_plus/series") {
      navigate(`/Disney_plus/show/tv/${id}`);
    }
  };

  return (
    <div className="mx-10">
      <div
        className="flex flex-nowrap gap-5 h-[140px] overflow-x-auto overflow-y-hidden hide-scrollbar"
        ref={carousel}
        style={{ scrollBehavior: "smooth" }}
      >
        {data
          .filter((data) => data.backdrop_path !== null)
          .map((info) => (
            <div
              className="relative"
              key={info.id}
              onClick={() => {
                goToDetailPage(info.id);
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w1280/${info.backdrop_path}`}
                className="max-w-[270px] h-full rounded-3xl object-cover"
                alt={
                  type === "movie" ? info.original_title : info.original_name
                }
              />
              <h1 className="text-white text-2xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 cursor-pointer">
                {truncateTitle(
                  type === "movie" ? info.original_title : info.original_name,
                  25
                )}
              </h1>
              <div className="w-full h-full bg-black opacity-20 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-0 cursor-pointer"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Carousel;
