import { useQuery } from "@tanstack/react-query";
import { moviesService } from "./movies.service.js";

export const useMovies = ({ enabled }) => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: moviesService.getAll,
    enabled: enabled
  });
};

export const useSearchMovies = (query) => {
  return useQuery({
    queryKey: ["findMovie", query],
    queryFn: () => moviesService.search(query),
    enabled: !!query
  });
};

export const useMovie = (id) => {
  return useQuery({
    queryKey: ["getMovieById", id],
    queryFn: () => moviesService.getById(id),
    enabled: !!id
  });
};