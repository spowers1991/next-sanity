// app/movies/page.tsx

import { Metadata } from "next";
import { getMovies } from "@/services/sanity/movie/queries/getMovies";
import { setMetadata } from "@/lib/seo/actions/setMetadata";
import { setMovieCarousel } from "@/services/seo/actions/setMovieCarousel";
import JsonLdScript from "@/lib/seo/components/JsonLdScript";
import Grid from "@/components/[Grid]/Grid";
import GridItem from "@/components/[Grid]/[GridItem]/GridItem";

export const metadata: Metadata = setMetadata({
  title: "Movie Archive",
  description: "Browse all movies from our Sanity collection.",
});

export default async function MoviesArchivePage() {
  const movies = await getMovies();

  return (
    <>
      <JsonLdScript json={setMovieCarousel(movies,`${process.env.NEXT_PUBLIC_SITE_URL}/movies/`)} />

      <div style={{ padding: "2rem" }}>
        <h1>Movie Archive</h1>
        <Grid columnsClassName="grid-cols-2 md:grid-cols-4 xl:grid-cols-6" className="max-w-7xl mx-auto">
          {movies.map(movie => (
            <GridItem key={movie._id} title={movie.title} slug={movie.slug.current} hrefPrefix="/movies" />
          ))}
        </Grid>
      </div>
    </>
  );
}
