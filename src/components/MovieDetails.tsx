"use client";
import { movieDetailsOptions } from "@/hooks/useMovieDetails";
import { useSuspenseQuery } from "@tanstack/react-query";

export type MovieDetailsProps = {
  movieId: string | number;
};

export const MovieDetails = ({ movieId }: MovieDetailsProps) => {
  const { data, isError } = useSuspenseQuery(movieDetailsOptions(movieId));

  //TODO - handle error
  if (isError) return <div>Error</div>;
  
  return (
    <div>
      <h1>Movie Details</h1>
      <div>
        <p>Movie ID: {data.id}</p>
        <p>Title: {data.title}</p>
        <p>Status: {data.status}</p>
      </div>
    </div>
  )
}