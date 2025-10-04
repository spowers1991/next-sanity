import type { Metadata } from "next";
import { generateStaticParamsForType } from "@/lib/sanity/ssg/generateStaticParams";
import { getMovie } from "@/services/sanity/movie/queries/getMovie";
import { getMovies } from "@/services/sanity/movie/queries/getMovies";
import { setMetadata } from "@/lib/seo/actions/setMetadata";
import { setStructuredData } from "@/services/seo/actions/setStructuredData";
import Movie from "@/components/[Movie]/Movie";
import JsonLdScript from "@/lib/seo/components/JsonLdScript";
import type { StructuredContentBase } from "@/services/seo/types/StructuredContentBase";

interface PageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60; // ISR seconds

export async function generateStaticParams() {
  return generateStaticParamsForType("movie", ["slug"]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const movie = await getMovie(slug);

  // Pass the full movie object directly to setMetadata (which handles image conversion)
  return setMetadata(movie);
}

export default async function MoviePage({ params }: PageProps) {
  const { slug } = params;

  const [movie, movies] = await Promise.all([getMovie(slug), getMovies()]);

  if (!movie) {
    return <p className="text-center text-gray-500">Movie not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <JsonLdScript
        json={setStructuredData(
          movie as StructuredContentBase,
          `${process.env.NEXT_PUBLIC_SITE_URL}/movies/${slug}`
        )}
      />

      <Movie movie={movie} movies={movies} />
    </div>
  );
}
