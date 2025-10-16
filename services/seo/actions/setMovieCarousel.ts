import type { Movie } from "@/services/sanity/movies/types/Movie";
import { urlForImage } from "@/lib/sanity/helpers/image";

type JsonLd = Record<string, unknown>;

export function setMovieCarousel(movies: Movie[] | null, baseUrl: string): JsonLd | null {
  if (!movies || movies.length === 0) return null;

    return {
    "@context": "https://schema.org",
    "@type": "ItemList",
        itemListElement: movies.map((movie, i) => {
            const imageUrl = movie.poster ? urlForImage(movie.poster).url() : undefined;
            const slug = typeof movie.slug === "string" ? movie.slug : movie.slug?.current;

            return {
            "@type": "ListItem",
            position: i + 1,
            item: {
                "@type": "Movie",
                name: movie.title,
                url: `${baseUrl}/movies/${slug}`, 
                ...(imageUrl ? { image: imageUrl } : {}),
                ...(movie.releaseDate ? { datePublished: movie.releaseDate } : {})
            }
            };
        })
    };
}
