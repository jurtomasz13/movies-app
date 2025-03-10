import { getQueryClient } from "@/app/getQueryClient";
import { MovieListing } from "@/components/MovieListing";
import { moviesOptions } from "@/hooks/useMovies";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(moviesOptions);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovieListing />
      </HydrationBoundary>
    </div>
  );
}
