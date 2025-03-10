import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/app/getQueryClient";
import { MovieDetails } from "@/components/MovieDetails";
import { movieDetailsOptions } from "@/hooks/useMovieDetails";

export type MovieDetailsPageProps = {
  params: Promise<{
    id: string | number;
  }>;
}

export default async function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const awaitedParams = await params;
  const movieId = awaitedParams.id;
  
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(movieDetailsOptions(movieId));
  
  return (
    <div>
      <h1>Movie Details Page</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovieDetails movieId={movieId} />
      </HydrationBoundary>
    </div>
  )
}