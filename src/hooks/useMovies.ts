import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMovies = async () => {
  try {
    const response = await axios.get("/api/tmdb/discover/movie");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch movies");
  }
};

export const useMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
};
