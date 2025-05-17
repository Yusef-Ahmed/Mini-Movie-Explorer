import { useRef, useState } from "react";
import { useMovies, useSearchMovies } from "./modules/movies/movies.hooks";
import ScrollDialog from "./components/ScrollDialog";
import { Button, CircularProgress, Pagination } from "@mui/material";
import Card from "./components/Card";
import { AnimatePresence } from "motion/react";

function App() {
  const search = useRef();

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

  if (defaultIsPending && filteredIsPending) {
    return (
      <CircularProgress
        size="5rem"
        className="absolute left-1/2 top-1/2 translate-[-50%]"
      />
    );
  }

  const displayedData = filteredData ?? defaultData;

  function handleSearch() {
    setQuery(search.current.value.trim());
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
      <div className="flex gap-2 lg:ml-10 lg:justify-start justify-center">
        <input
          ref={search}
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
      <div className="flex flex-wrap gap-x-5 gap-y-7 justify-center">
        {displayedData.results.length === 0 && (
          <h2 className="text-3xl my-10">There is no results</h2>
        )}
        {displayedData.results.map((movie) =>
          import.meta.env.VITE_BAD_WORDS.split(",").some(
            (word) =>
              movie.overview.toLowerCase().includes(word) ||
              movie.title.toLowerCase().includes(word)
          ) ? null : (
            <Card key={movie.id} movie={movie} handleClick={handleClick} />
          )
        )}
        <AnimatePresence>
          {openDialog && (
            <ScrollDialog
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              id={movieId}
            />
          )}
        </AnimatePresence>
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
