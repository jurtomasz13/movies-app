"use client";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import Link from "next/link";

export type MovieDetailsProps = {
  movieId: string | number;
};

export const MovieDetails = ({ movieId }: MovieDetailsProps) => {
  const { data, isError } = useMovieDetails(movieId);

  console.log(data);
  
  //TODO - handle error
  if (isError) return <div>Error</div>;
  
  return (
    <div>
      <h1>Movie Details</h1>
      <Link href="/">Back to list</Link>
      <div>
        <p>Movie ID: {data.id}</p>
        <p>Title: {data.title}</p>
        <p>Status: {data.status}</p>
        <p>Release date: {data.release_date}</p>
        <p>Description: {data.overview}</p>
      </div>
    </div>
  )
}