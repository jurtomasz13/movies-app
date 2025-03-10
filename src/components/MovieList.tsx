"use client";
import { useMovies } from "@/hooks/useMovies";

export const MovieList = () => {
  const { data } = useMovies();

  console.log(data);
  
  return (
    <div>
      <h1>Movie List</h1>
    </div>
  )
}