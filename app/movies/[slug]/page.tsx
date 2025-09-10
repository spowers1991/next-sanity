import { sanityClient } from "@/lib/sanity/api/client";
import type { Movie as MovieType  } from "@/lib/sanity/types/Movie";
import MainMenu from "@/components/[Header]/[MainMenu]/MainMenu";
import { urlForImage } from "@/lib/sanity/helpers/image";
import { Metadata } from "next";
import { setMovieMetadata } from "@/lib/seo/plugins/sanity/helpers/setMovieMetadata";
import Movie from "@/components/[Movie]/Movie";
import { cache } from "react";

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

  const movieImage = movie.poster ? urlForImage(movie.poster).url() : undefined;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <MainMenu />
      <Movie movie={movie} movies={movies} />
    </div>
  );
}
