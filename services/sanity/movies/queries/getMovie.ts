// lib/sanity/queries/getMovie.ts
import { sanityClient } from "@/lib/sanity/api/client";
import { cache } from "react";
import type { Movie as MovieType } from "@/services/sanity/movies/types/Movie";

export const getMovie = cache(async (slug: string): Promise<MovieType | null> => {
  return sanityClient.fetch(
    `*[_type == "movie" && slug.current == $slug][0]`,
    { slug }
  );
});
