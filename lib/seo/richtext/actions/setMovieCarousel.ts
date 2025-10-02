import type { Movie } from "@/services/sanity/movie/types/Movie";
import { urlForImage } from "@/lib/sanity/helpers/image";

type JsonLd = Record<string, unknown>;

/**
 * Create JSON-LD structured data for a list of movies (ItemList).
 */
export function setMovieCarousel(movies: Movie[] | null, baseUrl: string): JsonLd | null {
  if (!movies || movies.length === 0) return null;

  const jsonLd: JsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: movies.map((movie, i) => {
      const imageUrl = movie.poster ? urlForImage(movie.poster).url() : undefined;

      return {
        "@type": "ListItem",
        position: i + 1,
        url: `${baseUrl}/movies/${movie.slug}`,
        item: {
          "@type": "Movie",
          name: movie.title,
          ...(imageUrl ? { image: imageUrl } : {}),
          ...(movie.releaseDate ? { datePublished: movie.releaseDate } : {})
        }
      };
    }),
  };

  return jsonLd;
}
