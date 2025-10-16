"use client";

import { useEffect } from "react";
import { useMovies } from "@/services/sanity/movies/state/MoviesContext";
import Grid from "@/components/[Grid]/Grid";
import GridItem from "@/components/[Grid]/[GridItem]/GridItem";
import type { Movie } from "@/services/sanity/movies/types/Movie";

interface MoviesProps {
  initialMovies: Movie[];
}

export default function Movies({ initialMovies }: MoviesProps) {
  const { movies, setMovies } = useMovies();

  // ✅ Ensure context gets hydrated with SSR-fetched data
  useEffect(() => {
    if (initialMovies?.length && movies.length === 0) {
      setMovies(initialMovies);
    }
  }, [initialMovies, movies, setMovies]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="text-2xl font-semibold mb-6">Movie Archive</h1>

      <Grid
        columnsClassName="grid-cols-2 md:grid-cols-4 xl:grid-cols-6"
        className="max-w-7xl mx-auto"
      >
        {movies.map((movie) => (
          <GridItem
            key={movie._id}
            title={movie.title}
            slug={movie.slug?.current}
            hrefPrefix="/movies"
          />
        ))}
      </Grid>
    </div>
  );
}
