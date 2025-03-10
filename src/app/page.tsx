import { getQueryClient } from "@/app/getQueryClient";
import { MovieList } from "@/components/MovieList";

export default function Home() {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["movies"],
  });
  
  return (
    <div>
      <h1>Home</h1>
      <MovieList />
    </div>
  );
}
