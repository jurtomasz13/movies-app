import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import axios from "axios";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export type TMDBFilters = {
  vote_average: {
    gte: number;
    lte: number;
  };
  with_genres: string[];
  sort_by: string;
};

const fetchMoviesByFilters = async (filters?: TMDBFilters) => {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/api/tmdb/discover/movie`,
      {
        params: filters,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch movies");
  }
};

const fetchMoviesByQuery = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/api/tmdb/search/movie`, {
      params: {
        query,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch movies");
  }
};

export const moviesOptions = queryOptions({
  queryKey: ["movies"],
  queryFn: () => fetchMoviesByFilters(),
});

export const useMoviesSuspense = () => {
  return useSuspenseQuery(moviesOptions);
};

export const useMoviesWithFilters = (filters?: TMDBFilters) => {
  return useQuery({
    queryKey: ["movies", filters ? filters : ""],
    queryFn: () => fetchMoviesByFilters(filters),
    enabled: !!filters,
  });
};

export const useMoviesWithQuery = (query: string) => {
  return useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMoviesByQuery(query),
    enabled: !!query,
  });
};
