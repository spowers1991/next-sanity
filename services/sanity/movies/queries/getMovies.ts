// lib/sanity/queries/getMovies.ts
import { sanityClient } from "@/lib/sanity/api/client";
import { cache } from "react";
import type { Movie as MovieType } from "@/services/sanity/movies/types/Movie";

export const getMovies = cache(async (): Promise<MovieType[]> => {
  return sanityClient.fetch(
    `*[_type == "movie"] | order(releaseDate desc)`
  );
});
