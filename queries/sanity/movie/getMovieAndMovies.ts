import { sanityClient } from "@/lib/sanity/api/client";
import { cache } from "react";
import type { Movie as MovieType } from "@/types/sanity/Movie";

export const getMovieAndMovies = cache(async (slug: string) => {
  return sanityClient.fetch(
    `{
      "movie": *[_type == "movie" && slug.current == $slug][0],
      "movies": *[_type == "movie"] | order(releaseDate desc)
    }`,
    { slug }
  ) as Promise<{ movie: MovieType | null; movies: MovieType[] }>;
});
