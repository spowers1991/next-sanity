"use client";

import { useMovies } from "@/services/sanity/movies/state/MoviesContext";
import Grid from "@/components/[Grid]/Grid";
import GridItem from "@/components/[Grid]/[GridItem]/GridItem";

export default function Movies() {
  const { movies } = useMovies();

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="text-2xl font-semibold mb-6">
        Movie Archive
      </h1>
      <Grid>
        {movies.map((movie) => (
          <GridItem
            key={movie._id}
            label={movie.title}
            slug={movie._type+'s/'+movie.slug?.current}
          />
        ))}
      </Grid>
    </div>
  );
}
