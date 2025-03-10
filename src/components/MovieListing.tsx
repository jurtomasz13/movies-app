"use client";
import { MemoizedFilterPanel } from "@/components/FilterPanel";
import { MovieCard } from "@/components/MovieCard";
import { useMoviesWithFilters, useMoviesWithQuery, useMoviesSuspense } from "@/hooks/useMovies";
import { useCallback, useEffect, useState } from "react";

export const MovieListing = () => {
  const [pages, setPages] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tmdbFilters, setTmdbFilters] = useState();
  const [tmdbQuery, setTmdbQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cachedMoviesFiltered, setCachedMoviesFiltered] = useState<any[]>([]);

  const { data: { results: moviesInitial }, isError } = useMoviesSuspense();
  const { data: { results: moviesFiltered } = {} } = useMoviesWithFilters(tmdbFilters);
  const { data: { results: moviesQueried } = {} } = useMoviesWithQuery(tmdbQuery);

  // Update cachedMoviesFiltered only when moviesFiltered is available and different from cached state
  useEffect(() => {
    if (moviesFiltered) {
      setCachedMoviesFiltered(moviesFiltered);
    }
  }, [moviesFiltered]);

  const movies = tmdbQuery ? moviesQueried || [] : cachedMoviesFiltered || moviesInitial || [];

  // Only update filters if they have changed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSetFilters = useCallback((filters: any) => {
    setTmdbFilters((prevFilters) => {
      const updatedFilters = { ...filters };
      // Only update if filters actually change
      if (JSON.stringify(updatedFilters) !== JSON.stringify(prevFilters)) {
        return updatedFilters;
      }
      return prevFilters;
    });
  }, []);

  const handleSetQuery = useCallback((query: string) => {
    setTmdbQuery(query);
  }, []);
  
  //TODO - handle error
  if (isError) return <div>Error</div>;

  // TODO - type data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const moviesList = movies?.map((movie: any) => (
    <MovieCard key={movie.id} movie={movie} />
  ));

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Movie Listing</h1>
        <p className="text-muted-foreground">Discover and explore your favorite movies</p>
      </div>
      {/* Search and Filter*/}
      <div className="flex flex-col space-y-6">
        <MemoizedFilterPanel 
          movies={movies} 
          isFilterOpen={isFilterOpen} 
          setIsFilterOpen={setIsFilterOpen}
          setFilters={handleSetFilters}
          setQuery={handleSetQuery}
        />
      </div>
      {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Showing {movies.length} of {movies.length} movies
        </div>
      {/* Movie Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {moviesList}
      </div>
      {/* Pagination */}
    </div>
  )
}