import { useMovies } from "./movies.hooks";

function App() {
  const { isPending, error, data } = useMovies();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-wrap gap-4 justify-between">
      {data.results.map((movie) => (
        <div className="border p-5">
          <h1>{movie.title}</h1>
          <img
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
  );
}

export default App;
