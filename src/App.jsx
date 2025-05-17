import { useRef, useState } from "react";
import { useMovies, useSearchMovies } from "./modules/movies/movies.hooks";
import ScrollDialog from "./components/ScrollDialog";

function App() {
  const [query, setQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const ref = useRef();
  const { isPending, data: defaultData } = useMovies({ enabled: !query });
  const { data: filteredData } = useSearchMovies(query);

  const displayedData = filteredData ?? defaultData;

  if (isPending) return <div>Loading...</div>;

  function handleSearch() {
    setQuery(ref.current.value.trim());
  }

  function handleClick(id) {
    setMovieId(id);
    setOpenDialog(true);
  }

  return (
    <>
      <input ref={ref} className="p-2 border" name="search"></input>
      <button onClick={handleSearch}>Search</button>
      <div className="flex flex-wrap gap-4 justify-between">
        {displayedData.results.map((movie) => (
          <div onClick={() => handleClick(movie.id)} className="border p-5">
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
        <ScrollDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          id={movieId}
        />
      </div>
    </>
  );
}

export default App;
