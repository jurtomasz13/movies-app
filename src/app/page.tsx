import { getQueryClient } from "@/app/getQueryClient";
import { MovieList } from "@/components/MovieList";
import { moviesOptions } from "@/hooks/useMovies";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(moviesOptions);
  
  return (
    <div>
      <h1>Home Page</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovieList />
      </HydrationBoundary>
    </div>
  );
}
