// components/Movie/Movie.tsx
import Filters from "@/components/[Filters]/Filters";
import MovieContent from "@/components/[Movie]/[MovieContent]/MovieContent";
import { Movie as MovieType } from "@/services/sanity/movie/types/Movie";
import { urlForImage } from "@/lib/sanity/helpers/image";

interface MovieProps {
  movie: MovieType;
  movies: MovieType[];
}

export default function Movie({ movie, movies }: MovieProps) {
  const movieImage = movie.poster ? urlForImage(movie.poster).url() : undefined;

  return (
    <div className="flex flex-row w-full">
      <div className="w-2/4">
        <Filters
          itemsToFilter={movies}
          filtersToShow={[
            {
              type: "checkbox",
              label: "Cast Members",
              propertyToSearch: "castMembers.characterName",
            },
            {
              type: "textSearch",
              label: "Search by Title",
              propertyToSearch: "title",
            },
          ]}
        />
      </div>
      <div className="w-2/4">
        <MovieContent
          title={movie.title}
          posterUrl={movieImage!}
          releaseDate={movie.releaseDate}
          popularity={movie.popularity}
          overview={movie.overview?.[0]?.children?.[0]?.text || ""}
          castMembers={movie.castMembers}
        />
      </div>
    </div>
  );
}
