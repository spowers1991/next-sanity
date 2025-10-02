import type { Movie } from "@/services/sanity/movie/types/Movie";
import { urlForImage } from "@/lib/sanity/helpers/image";

type JsonLd = Record<string, unknown>;

export function setMovieCarousel(movies: Movie[] | null, baseUrl: string): JsonLd | null {
  if (!movies || movies.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: movies.map((movie, i) => {
      const imageUrl = movie.poster ? urlForImage(movie.poster).url() : undefined;
      const slug = typeof movie.slug === "string" ? movie.slug : movie.slug?.current; // ✅ fix

      return {
        "@type": "ListItem",
        position: i + 1,
        url: `${baseUrl}/movies/${slug}`, // ✅ will now resolve properly
        item: {
          "@type": "Movie",
          name: movie.title,
          ...(imageUrl ? { image: imageUrl } : {}),
          ...(movie.releaseDate ? { datePublished: movie.releaseDate } : {}),
          ...(slug
            ? { url: `${baseUrl}/movies/${slug}` } // ✅ add Movie-level URL
            : {})
        }
      };
    }),
  };
}
