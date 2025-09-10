import { sanityClient } from "@/lib/sanity/api/client";
import type { Movie } from "@/lib/sanity/types/Movie";

export async function fetchMovieBySlug(slug: string): Promise<Movie | null> {
  const movie: Movie | null = await sanityClient.fetch(
    `*[_type == "movie" && slug.current == $slug][0]`,
    { slug }
  );
  return movie;
}
