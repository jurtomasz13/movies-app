"use client";
import { MemoizedFilterPanel } from "@/components/FilterPanel";
import { MovieCard } from "@/components/MovieCard";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";
import { useMoviesWithFilters, useMoviesWithQuery, useMoviesSuspense } from "@/hooks/useMovies";
import { useCallback, useEffect, useState } from "react";

export const MovieListing = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tmdbFilters, setTmdbFilters] = useState();
  const [tmdbQuery, setTmdbQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cachedMoviesFiltered, setCachedMoviesFiltered] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: { results: moviesInitial, total_pages: totalPagesInitial }, isError } = useMoviesSuspense();
  const { data: { results: moviesFiltered, total_pages: totalPagesFiltered } = {} } = useMoviesWithFilters(tmdbFilters, currentPage);
  const { data: { results: moviesQueried, total_pages: totalPagesQueried } = {} } = useMoviesWithQuery(tmdbQuery, currentPage);

  // Update cachedMoviesFiltered only when moviesFiltered is available and different from cached state
  useEffect(() => {
    if (moviesFiltered) {
      setCachedMoviesFiltered(moviesFiltered);
    }
  }, [moviesFiltered]);

  const movies = tmdbQuery ? moviesQueried || [] : cachedMoviesFiltered || moviesInitial || [];
  const maxPages = tmdbQuery ? totalPagesQueried : tmdbFilters ? totalPagesFiltered : totalPagesInitial;
  const totalPages = maxPages > 500 ? 500 : maxPages;

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
    setCurrentPage(1);
  }, []);

  const handleSetQuery = useCallback((query: string) => {
    setTmdbQuery(query);
    setCurrentPage(1);
  }, []);
  
  //TODO - handle error
  if (isError) return <div>Error</div>;

  // TODO - type data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const moviesList = movies?.map((movie: any) => (
    <MovieCard key={movie.id} movie={movie} />
  ));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

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
      {movies.length > 0 && totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) handlePageChange(currentPage - 1)
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1

                  // Show first page, last page, current page, and pages around current page
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            handlePageChange(pageNumber)
                          }}
                          isActive={pageNumber === currentPage}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  }

                  // Show ellipsis for gaps
                  if (
                    (pageNumber === 2 && currentPage > 3) ||
                    (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }

                  return null
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) handlePageChange(currentPage + 1)
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
    </div>
  )
}