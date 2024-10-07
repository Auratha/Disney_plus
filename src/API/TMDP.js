// movieService.js

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjIxMDMxNWUzMjk2Nzg2M2VjOTZlMzA3YjE3ZDhkOSIsIm5iZiI6MTcyNzYxMzk2Ny45MzExNjgsInN1YiI6IjY2ZjI3YTI2NmMzYjdhOGQ2NDhlMTZmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y5eXyp8-KR7Pv8vzWKCiNKTQSMFuSxIhTE7QnjoD8-M'
    }
  };

  export const fetchTrendingMovies = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc&with_companies=2`, options);
        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
      }
  }
  
  export const fetchMovies = async (type) => {

    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/${type === "movie" ? "movie" : "tv"}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=${type === "movie" ? "primary_release_date.desc" : "popularity.asc"}${type === "movie" ? "&with_companies=2" : ""}${type === "tv" && "&with_origin_country=US"}`, options);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  };

  export const fetchMoviesByGenre = async (genreId,type,number = 20) => {

    let currentPage = 1;
    const movieArray = [];

    do {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/${type === "movie" ? "movie" : "tv"}?language=en-US&page=${currentPage}&sort_by=primary_release_date.desc${type === "movie" ? "&with_companies=2" : ""}&with_genres=${genreId}`, options);
            const data = await response.json();
            if(data.results.length === 0) {
              break;
            }
            let temp = data.results.filter((movie) => movie.genre_ids.includes(genreId));
            movieArray.push(...temp);
            currentPage++;
          } catch (error) {
            console.error('Error fetching movies:', error);
            return [];
          }
          
    } while(movieArray.length < number);

    return movieArray;
}

  export const fetchMovieDetails = async (id,type) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/${type === "movie" ? "movie" : "tv"}/${id}?language=en-US`, options);
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  }


  export const fetchYoutubeKey = async (id,type) => {

  try {
    const response = await fetch(`https://api.themoviedb.org/3/${type === "movie" ? "movie" : "tv"}/${id}/videos?language=en-US`, options);
    const data = await response.json();
    return data.results[0]?.key;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
  }

  
  