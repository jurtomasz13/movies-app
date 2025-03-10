/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, DollarSign, ExternalLink, Globe, Info, Star, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCurrency } from "@/utils/currencyUtils";
import { formatDate } from "@/utils/dateUtils";
import Image from 'next/image';

export type MovieDetailsProps = {
  movieId: string | number;
};

export const MovieDetails = ({ movieId }: MovieDetailsProps) => {
  const { data: movie } = useMovieDetails(movieId);

  const profit = movie.revenue - movie.budget
  const profitPercentage = movie.budget > 0 ? (profit / movie.budget) * 100 : 0

  return (
    <div className="min-h-screen pb-10">
      {/* Hero Section with Backdrop */}
      <div className="relative w-full h-[40vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        <Image
          src={`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />

        {/* Back button */}
        <div className="absolute top-4 left-4 z-20">
          <Link href="/">
            <Button variant="outline" size="icon" className="cursor-pointer rounded-full bg-background/50 backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Movie Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Poster */}
          <div className="relative h-[180px] w-[120px] md:h-[270px] md:w-[180px] shadow-lg rounded-lg overflow-hidden flex-shrink-0">
            <Image src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt={movie.title} fill className="object-cover" />
          </div>

          {/* Movie Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold">{movie.title}</h1>
                {movie.original_title !== movie.title && (
                  <p className="text-sm text-muted-foreground">Original title: {movie.original_title}</p>
                )}
                {movie.tagline && <p className="text-lg italic text-muted-foreground mt-1">&quot;{movie.tagline}&quot;</p>}
              </div>

              <div className="flex gap-2">
                {movie.homepage && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" asChild>
                          <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">Official Website</span>
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Official Website</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                {movie.imdb_id && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={`https://www.imdb.com/title/${movie.imdb_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Info className="h-4 w-4" />
                            <span className="sr-only">IMDB</span>
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View on IMDB</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <Badge variant="outline" className="text-sm font-medium">
                {movie.status}
              </Badge>
              <Badge variant="outline" className="text-sm font-medium">
                {formatDate(movie.release_date)}
              </Badge>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className="font-medium">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{movie.vote_average.toFixed(1)}/10</span>
                <span className="text-xs text-muted-foreground">({movie.vote_count} votes)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {movie.genres.map((genre: { id: number, name: string }) => (
                <Badge key={genre.id} className="bg-primary/20 text-primary hover:bg-primary/30">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-2 text-muted-foreground">{movie.overview}</p>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Release Information
                </h2>
                <dl className="space-y-1">
                  <div className="flex gap-2">
                    <dt className="font-medium">Release Date:</dt>
                    <dd className="text-muted-foreground">{formatDate(movie.release_date)}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium">Status:</dt>
                    <dd className="text-muted-foreground">{movie.status}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium">Country:</dt>
                    <dd className="text-muted-foreground">
                      {movie.production_countries.map((country: { name: string }) => country.name)?.join(", ")}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Financial
                </h2>
                <dl className="space-y-1">
                  <div className="flex gap-2">
                    <dt className="font-medium">Budget:</dt>
                    <dd className="text-muted-foreground">{formatCurrency(movie.budget)}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium">Revenue:</dt>
                    <dd className="text-muted-foreground">{formatCurrency(movie.revenue)}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium">Profit:</dt>
                    <dd className={profit >= 0 ? "text-green-500" : "text-red-500"}>
                      {formatCurrency(profit)} ({profitPercentage.toFixed(1)}%)
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Language
                </h2>
                <dl className="space-y-1">
                  <div className="flex gap-2">
                    <dt className="font-medium">Original Language:</dt>
                    <dd className="text-muted-foreground">
                      {movie.spoken_languages.find((lang: any) => lang.iso_639_1 === movie.original_language)
                        ?.english_name || movie.original_language.toUpperCase()}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium">Spoken Languages:</dt>
                    <dd className="text-muted-foreground">
                      {movie.spoken_languages.map((lang: any) => lang.english_name).join(", ")}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Production Companies
              </h2>
              <div className="flex flex-wrap gap-6 items-center">
                {movie.production_companies.map((company: { id: number, name: string }) => (
                  <div key={company.id} className="flex flex-col items-center">
                    <span className="text-sm text-center">{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}