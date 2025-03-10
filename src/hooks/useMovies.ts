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

const fetchMoviesByFilters = async (filters?: TMDBFilters, page?: number) => {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/api/tmdb/discover/movie`,
      {
        params: {
          ...filters,
          page,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch movies");
  }
};

const fetchMoviesByQuery = async (query: string, page: number) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/api/tmdb/search/movie`, {
      params: {
        query,
        page,
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

export const useMoviesWithFilters = (filters?: TMDBFilters, page?: number) => {
  return useQuery({
    queryKey: ["movies", filters ? filters : "", page],
    queryFn: () => fetchMoviesByFilters(filters, page),
    enabled: !!filters,
  });
};

export const useMoviesWithQuery = (query: string, page: number) => {
  const currentPage = query ? page : 1;

  return useQuery({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMoviesByQuery(query, currentPage),
    enabled: !!query,
  });
};
