import React, { useEffect, useState } from 'react';

const key = process.env.REACT_APP_API_KEY;
console.log(key);

// interface Movie {
//   adult: boolean;
//   backdrop_path: string | null;
//   belongs_to_collection: {} | null;
//   budget: 63000000
//   genres: [{id: 18, name: "Drama"}]
//   homepage: "http://www.foxmovies.com/movies/fight-club"
//   id: 550
//   imdb_id: "tt0137523"
//   original_language: "en"
//   original_title: "Fight Club"
//   overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion."
//   popularity: 30.497
//   poster_path: "/adw6Lq9FiC9zjYEpOqfq03ituwp.jpg"
//   production_companies: [{id: 508, logo_path: "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png", name: "Regency Enterprises",…},…]
//   production_countries: [{iso_3166_1: "DE", name: "Germany"}, {iso_3166_1: "US", name: "United States of America"}]
//   release_date: "1999-10-15"
//   revenue: 100853753
//   runtime: 139
//   spoken_languages: [{iso_639_1: "en", name: "English"}]
//   status: "Released"
//   tagline: "Mischief. Mayhem. Soap."
//   title: "Fight Club"
//   video: false
//   vote_average: 8.4
//   vote_count: 16855
// }

interface MovieShowcase {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface DiscoverMovies {
  page: number;
  total_results: number;
  total_pages: number;
  results: MovieShowcase[];
}

const App: React.FC = () => {
  const [s, setS] = useState<null | DiscoverMovies>(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/550?api_key=${key}`)
      .then(res => res.json())
      .then(console.log);
    fetch('https://api.themoviedb.org/3/discover/movie')
      .then(res => res.json())
      .then(setS);
  }, []);

  return (
    <div className="App">
      {s && (
        <>
          <h1>{`found ${s.total_results}`}</h1>
          <div>
            {s.results.map(m => (
              <div key={m.id}>
                <h3>{m.title}</h3>
                <img
                  src={`http://image.tmdb.org/t/p/w200/${m.poster_path}`}
                  alt={m.title}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;

