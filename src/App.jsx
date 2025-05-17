import { useRef, useState } from "react";
import { useMovies, useSearchMovies } from "./modules/movies/movies.hooks";
import ScrollDialog from "./components/ScrollDialog";
import { Button, CircularProgress } from "@mui/material";

function App() {
  const [query, setQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const ref = useRef();
  const { isPending, data: defaultData } = useMovies({ enabled: !query });
  const { data: filteredData } = useSearchMovies(query);

  const displayedData = filteredData ?? defaultData;

  if (isPending)
    return (
      <CircularProgress
        size="5rem"
        className="absolute left-1/2 top-1/2 translate-[-50%]"
      />
    );

  function handleSearch() {
    setQuery(ref.current.value.trim());
  }

  function handleClick(id) {
    setMovieId(id);
    setOpenDialog(true);
  }

  return (
    <main className="flex flex-col gap-5">
      <h1 className="text-center text-5xl mt-10">Mini Movie Explorer</h1>
      <div className="flex gap-2 ml-2">
        <input
          ref={ref}
          className="p-2 border border-gray-400 rounded"
          name="search"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button variant="contained" color="info" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {displayedData.results.map((movie) =>
          movie.poster_path ? (
            <div
              onClick={() => handleClick(movie.id)}
              className="border cursor-pointer rounded-lg grow text-center flex flex-col gap-4 py-4 max-w-[250px]"
            >
              <h1 className="text-xl font-semibold truncate mx-5">
                {movie.title}
              </h1>
              <img
                className="mx-auto"
                src={
                  "https://image.tmdb.org/t/p/w220_and_h330_face" +
                  movie.poster_path
                }
                loading="lazy"
              />
              <p>
                <b>Release Date: </b>
                {movie.release_date}
              </p>
            </div>
          ) : null
        )}
        {openDialog && (
          <ScrollDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            id={movieId}
          />
        )}
      </div>
    </main>
  );
}

export default App;
