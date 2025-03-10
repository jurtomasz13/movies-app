import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter, Search } from "lucide-react"
import { memo, useEffect, useState } from "react";
import TMDB_GENRES from "@/utils/tmdbGenres";

export type FilterBarProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  movies: any[];
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  setFilters: (filters: Record<string, unknown>) => void;
  setQuery: (query: string) => void;
};

export const FilterPanel = ({ isFilterOpen, setIsFilterOpen, setFilters, setQuery }: FilterBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("popularity.desc");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [ratingRange, setRatingRange] = useState([0, 10]);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
    } else {
      setSelectedGenres([...selectedGenres, genre])
    }
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setRatingRange([0, 10]);
    setSortOption("popularity.desc");
  };

  useEffect(() => {
    setFilters({
      vote_average: {
        gte: ratingRange[0],
        lte: ratingRange[1],
      },
      with_genres: selectedGenres,
      sort_by: sortOption,
    });
  }, [sortOption, selectedGenres, ratingRange, setFilters]);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery, setQuery]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search movies..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>

          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px] cursor-pointer">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem className="cursor-pointer" value="popularity.desc">Popularity</SelectItem>
                <SelectItem className="cursor-pointer" value="title.asc">Title (A-Z)</SelectItem>
                <SelectItem className="cursor-pointer" value="title.desc">Title (Z-A)</SelectItem>
                <SelectItem className="cursor-pointer" value="primary_release_date.desc">Year (Newest)</SelectItem>
                <SelectItem className="cursor-pointer" value="primary_release_date.asc">Year (Oldest)</SelectItem>
                <SelectItem className="cursor-pointer" value="vote_average.desc">Rating (Highest)</SelectItem>
                <SelectItem className="cursor-pointer" value="vote_average.asc">Rating (Lowest)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isFilterOpen && (
        <div className="bg-card rounded-lg p-6 border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Button className="cursor-pointer" variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Genre Filter */}
            <div>
              <h3 className="text-sm font-medium mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(TMDB_GENRES).map(([genre]) => (
                  <Button
                    key={genre}
                    variant={selectedGenres.includes(genre) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleGenre(genre)}
                    className={cn(selectedGenres.includes(genre) ? "bg-primary text-primary-foreground" : "", "cursor-pointer")}
                  >
                    {TMDB_GENRES[genre as unknown as number]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-sm font-medium mb-3">
                Rating: {ratingRange[0].toFixed(1)} - {ratingRange[1].toFixed(1)}
              </h3>
              <Slider
                value={ratingRange}
                min={0}
                max={10}
                step={0.1}
                onValueChange={setRatingRange}
                className="my-6"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const MemoizedFilterPanel = memo(FilterPanel);