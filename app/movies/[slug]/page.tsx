import type { Metadata } from "next";
import { generateStaticParamsForType } from "@/lib/sanity/ssg/generateStaticParams";
import { getMovie } from "@/services/sanity/movie/queries/getMovie";
import { getMovies } from "@/services/sanity/movie/queries/getMovies";
import { setMetadata } from "@/lib/seo/actions/setMetadata";
import { setRichText } from "@/lib/seo/richtext/actions/setRichText";
import Movie from "@/components/[Movie]/Movie";

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
  const { slug } = await params;
  const movie = await getMovie(slug);
  return setMetadata(movie);
}

export default async function MoviePage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch movie and all movies in parallel for efficiency
  const [movie, movies] = await Promise.all([getMovie(slug), getMovies()]);

  if (!movie) {
    return <p className="text-center text-gray-500">Movie not found</p>;
  }

  // Build JSON-LD structured data
  const jsonLd = setRichText(movie, `https://yoursite.com/movies/${slug}`);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Inject JSON-LD structured data */}
      {jsonLd && (console.log(jsonLd),
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <Movie movie={movie} movies={movies} />
    </div>
  );
}
