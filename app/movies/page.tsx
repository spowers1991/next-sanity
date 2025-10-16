import type { Metadata } from "next";
import { setMetadata } from "@/lib/seo/actions/setMetadata";
import { setMovieCarousel } from "@/services/seo/actions/setMovieCarousel";
import JsonLdScript from "@/lib/seo/components/JsonLdScript";
import { getMovies } from "@/services/sanity/movies/queries/getMovies";
import Movies from "@/components/[Movies]/Movies"; 

export const metadata: Metadata = setMetadata({
  title: "Movie Archive",
  description: "Browse all movies from our Sanity collection.",
});

export default async function MoviesArchivePage() {
  // ✅ Fetch server-side for SEO + structured data
  const movies = await getMovies();

  return (
    <>
      <JsonLdScript
        json={setMovieCarousel(
          movies,
          `${process.env.NEXT_PUBLIC_SITE_URL}/movies/`
        )}
      />

      {/* 👇 Hydrate Movies client component */}
      <Movies initialMovies={movies} />
    </>
  );
}
