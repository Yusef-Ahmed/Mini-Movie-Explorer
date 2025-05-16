import { useRef, useState } from "react";
import { useMovies, useSearchMovies } from "./modules/movies/movies.hooks";

function App() {
  const [query, setQuery] = useState("");
  const ref = useRef();
  const { isPending, data: defaultData } = useMovies({ enabled: !query });
  const { data: filteredData } = useSearchMovies(query);

  const displayedData = filteredData ?? defaultData;

  if (isPending) return <div>Loading...</div>;

  function handleSearch() {
    setQuery(ref.current.value.trim());
  }

  return (
    <>
      <input ref={ref} className="p-2 border" name="search"></input>
      <button onClick={handleSearch}>Search</button>
      <div className="flex flex-wrap gap-4 justify-between">
        {displayedData.results.map((movie) => (
          <div className="border p-5">
            <h1>{movie.title}</h1>
            <img
              className="mx-auto"
              src={
                "https://image.tmdb.org/t/p/w220_and_h330_face" +
                movie.poster_path
              }
              loading="lazy"
            />
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
