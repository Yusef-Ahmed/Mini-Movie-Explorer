import { useRef, useState } from "react";
import { useMovies, useSearchMovies } from "./modules/movies/movies.hooks";
import ScrollDialog from "./components/ScrollDialog";
import { Button, CircularProgress, Pagination } from "@mui/material";

function App() {
  const ref = useRef();

  const [query, setQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const { isPending: defaultIsPending, data: defaultData } = useMovies(
    { enabled: !query },
    pageNumber
  );
  const { isPending: filteredIsPending, data: filteredData } = useSearchMovies(
    query,
    pageNumber
  );

  const displayedData = filteredData ?? defaultData;

  if (defaultIsPending && filteredIsPending) {
    return (
      <CircularProgress
        size="5rem"
        className="absolute left-1/2 top-1/2 translate-[-50%]"
      />
    );
  }

  function handleSearch() {
    setQuery(ref.current.value.trim());
  }

  function handleClick(id) {
    setMovieId(id);
    setOpenDialog(true);
  }

  function handlePageChange(_event, page) {
    setPageNumber(page);
  }

  return (
    <main className="flex flex-col gap-10">
      <h1 className="text-center text-2xl md:text-5xl mt-15">
        Mini Movie Explorer
      </h1>
      <div className="flex gap-2 ml-2 md:justify-start justify-center">
        <input
          ref={ref}
          className="md:p-2 border border-gray-400 rounded"
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
        {displayedData.results.length === 0 && (
          <h2 className="text-3xl my-10">There is no results</h2>
        )}
        {displayedData.results.map((movie) => (
          <div
            key={movie.id}
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
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "../assets/alt-image.png";
              }}
              loading="lazy"
            />
            <p>
              <b>Release Date: </b>
              {movie.release_date}
            </p>
          </div>
        ))}
        {openDialog && (
          <ScrollDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            id={movieId}
          />
        )}
      </div>
      <Pagination
        page={pageNumber}
        count={Math.min(displayedData.total_pages, 500)}
        onChange={handlePageChange}
        color="primary"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#f0ffff",
          },
          "& .MuiPaginationItem-icon": {
            color: "#fff",
          },
        }}
        className="mx-auto mb-7"
      />
    </main>
  );
}

export default App;
