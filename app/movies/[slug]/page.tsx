import { sanityClient } from "@/lib/sanity/api/client";
import { cache } from "react";
import { Metadata } from "next";
import { setMovieMetadata } from "@/lib/seo/plugins/sanity/helpers/setMovieMetadata";
import type { Movie as MovieType  } from "@/types/sanity/Movie";
import Movie from "@/components/[Movie]/Movie";
import Header from "@/components/[Header]/Header";

interface MoviePageProps {
  params: { slug: string };
}

// Incremental static regeneration (optional)
export const revalidate = 60; // seconds

// --- Cached Sanity queries ---
const getAllSlugs = cache(async () => {
  const movies: MovieType[] = await sanityClient.fetch(`*[_type == "movie"]{ slug }`);
  return movies;
});

const getMovieAndMovies = cache(async (slug: string) => {
  return sanityClient.fetch(
    `{
      "movie": *[_type == "movie" && slug.current == $slug][0],
      "movies": *[_type == "movie"] | order(releaseDate desc)
    }`,
    { slug }
  ) as Promise<{ movie: MovieType | null; movies: MovieType[] }>;
});

// --- Static paths for SSG ---
export async function generateStaticParams() {
  const movies = await getAllSlugs();
  return movies.map((movie) => ({ slug: movie.slug.current }));
}

// --- Metadata for SEO ---
export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { movie } = await getMovieAndMovies(slug);
  return setMovieMetadata(movie, slug);
}

// --- Page Component ---
export default async function MoviePage({ params }: MoviePageProps) {
  const { slug } = await params;
  const { movie, movies } = await getMovieAndMovies(slug);

  if (!movie) {
    return <p className="text-center text-gray-500">Movie not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <Movie movie={movie} movies={movies} />
    </div>
  );
}
