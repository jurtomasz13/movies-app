import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMovies = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/tmdb/discover/movie"
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch movies");
  }
};

export const moviesOptions = queryOptions({
  queryKey: ["movies"],
  queryFn: fetchMovies,
});

export const useMovies = () => {
  return useQuery(moviesOptions);
};
