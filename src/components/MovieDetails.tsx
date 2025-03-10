"use client";
import { useMovieDetails } from "@/hooks/useMovieDetails";

export type MovieDetailsProps = {
  movieId: string | number;
};

export const MovieDetails = ({ movieId }: MovieDetailsProps) => {
  const { data } = useMovieDetails(movieId);

  console.log(data);
  
  return (
    <div>
      <h1>Movie Details</h1>
    </div>
  )
}