import { getQueryClient } from "@/app/getQueryClient";
import { MovieDetails } from "@/components/MovieDetails";

export type MovieDetailsPageProps = {
  params: {
    id: string | number;
  };
}

export default async function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const movieId = params.id;
  
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["movie-details", movieId],
  });
  
  return (
    <div>
      <h1>Movie Details</h1>
      <MovieDetails movieId={movieId} />
    </div>
  )
}