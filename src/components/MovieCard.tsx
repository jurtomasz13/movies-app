import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from 'next/image';
import Link from "next/link";
import TMDB_GENRES from "@/utils/tmdbGenres";

type MovieCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  movie: any;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const year = new Date(movie.release_date).getFullYear()
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-[2/3] relative">
        <Link href={`/movies/${movie.id}`}>
          <Image
            src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}` || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{movie?.vote_average.toFixed(1)}</span>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{movie.title}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-muted-foreground">{year}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {/*eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {movie.genre_ids.slice(0, 2).map((genre: any) => (
            <span key={genre} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">
              {TMDB_GENRES[genre]}
            </span>
          ))}
          {movie.genre_ids.length > 2 && (
            <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">
              +{movie.genre_ids.length - 2}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
