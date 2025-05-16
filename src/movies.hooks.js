import { useQuery } from "@tanstack/react-query";
import { moviesService } from "./movies.service";

export const useMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: moviesService.getAll,
  });
};