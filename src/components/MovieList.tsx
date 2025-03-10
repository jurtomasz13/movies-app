"use client";
import { moviesOptions } from "@/hooks/useMovies";
import { useSuspenseQuery } from "@tanstack/react-query";

export const MovieList = () => {
  const { data, isError } = useSuspenseQuery(moviesOptions);

  //TODO - handle error
  if (isError) return <div>Error</div>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const movies = data.map((movie: any) => (
    <li key={movie.id}>{movie.title}</li>
  ));
  
  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies}
      </ul>
    </div>
  )
}