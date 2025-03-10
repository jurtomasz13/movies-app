import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL ||
  `https://${process.env.VERCEL_URL}` ||
  "http://localhost:3000";

const fetchMovieDetails = async (movieId: string | number) => {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/api/tmdb/movie/${movieId}`
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
  return useSuspenseQuery({
    ...movieDetailsOptions(movieId),
  });
};
