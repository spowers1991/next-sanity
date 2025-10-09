// MovieContent.tsx
import MoviePoster from "./[MoviePoster]/MoviePoster";
import MovieInfo from "./[MovieInfo]/MovieInfo";
import type { Movie } from "@/services/sanity/movies/types/Movie";
import { transformString } from "@/lib/parsers/transformString"

export type MovieContentProps = Pick<Movie, "title" | "releaseDate" | "popularity" | "overview" | "castMembers"> & {
  posterUrl?: string; // derived via urlForImage(movie.poster)
};

export default function MovieContent({
  title,
  posterUrl,
  releaseDate,
  popularity,
  overview,
  castMembers
}: MovieContentProps) {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-10 items-start">
        {/* Poster */}
        {posterUrl && <MoviePoster title={title} posterUrl={posterUrl} />}

        {/* Info */}
        <MovieInfo
          title={title}
          releaseDate={releaseDate}
          popularity={popularity}
          overview={overview?.[0]?.children?.[0]?.text} 
        />
        <div className="flex flex-col gap-3">
          {castMembers.map((castMembers, index) => (
            <div key={castMembers._key} className="flex gap-1 flex-col p-3 border-2">
              <div key={castMembers._key || index}>
                {castMembers.characterName} 
              </div>
              <div className="text-red-900">
                {transformString(castMembers.person._ref, 'snake')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
