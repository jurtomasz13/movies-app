import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMovieDetails = async (movieId: string | number) => {
  try {
    const response = await axios.get(`/api/tmdb/discover/movies/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch movie details");
  }
};

export const useMovieDetails = (movieId: string | number) => {
  return useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => fetchMovieDetails(movieId),
  });
};
