import { sanityClient } from "@/lib/sanity/api/client";
import { Movie } from "@/lib/sanity/types/movie";
import PostsMenu from "@/components/PostsMenu";
import { urlForImage } from "@/lib/sanity/helpers/image";
import { Metadata } from "next";
import { setMovieMetadata } from "@/lib/seo/plugins/sanity/helpers/setMovieMetadata";
import MovieContent from "@/components/sanity/movies/MovieContent";
import Filters from "@/components/filters/Filters";

interface MoviePageProps {
  params: { slug: string };
}

// Generate static paths for SSG
export async function generateStaticParams() {
  const movies: Movie[] = await sanityClient.fetch(`*[_type == "movie"]{ slug }`);
  return movies.map((movie) => ({ slug: movie.slug.current }));
}

// Generate MetaData for SEO
export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { slug } = await params;
  const movie: Movie | null = await sanityClient.fetch(
    `*[_type == "movie" && slug.current == $slug][0]`,
    { slug }
  );
  return setMovieMetadata(movie, slug);
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { slug } = await params;

  // Fetch current movie
  const movie: Movie | null = await sanityClient.fetch(
    `*[_type == "movie" && slug.current == $slug][0]`,
    { slug }
  );

  // Fetch all movies for FilteredListing
  const movies: Movie[] = await sanityClient.fetch(
    `*[_type == "movie"] | order(releaseDate desc)`
  );

  if (!movie) {
    return <p className="text-center text-gray-500">Movie not found</p>;
  }

  const movieImage = movie.poster ? urlForImage(movie.poster).url() : undefined;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <PostsMenu />
      <div className="flex flex-row w-full">
        <div className="w-2/4">
          <Filters itemsToFilter={movies} />
        </div>
        <div className="w-2/4">
          <MovieContent
            title={movie.title}
            posterUrl={movieImage!}
            releaseDate={movie.releaseDate}
            popularity={movie.popularity}
            overview={movie.overview?.[0]?.children?.[0]?.text || ""}
            castMembers={movie.castMembers}
          />
        </div>
      </div>
    </div>
  );
}
