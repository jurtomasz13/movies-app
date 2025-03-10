import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMovieDetails = async (movieId: string | number) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/tmdb/movie/${movieId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch movie details");
  }
};

export const movieDetailsOptions = (movieId: string | number) =>
  queryOptions({
    queryKey: ["movie-details", movieId],
    queryFn: () => fetchMovieDetails(movieId),
  });

export const useMovieDetails = (movieId: string | number) => {
  return useQuery({
    ...movieDetailsOptions(movieId),
  });
};
