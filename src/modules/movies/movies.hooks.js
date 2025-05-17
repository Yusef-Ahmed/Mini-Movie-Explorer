import { useQuery } from "@tanstack/react-query";
import { moviesService } from "./movies.service.js";

export const useMovies = ({ enabled }, pageNumber) => {
  return useQuery({
    queryKey: ["movies", pageNumber],
    queryFn: () => moviesService.getAll(pageNumber || 1),
    enabled: enabled
  });
};

export const useSearchMovies = (query, pageNumber) => {
  return useQuery({
    queryKey: ["findMovie", query, pageNumber],
    queryFn: () => moviesService.search(query, pageNumber || 1),
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