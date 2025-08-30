import { Metadata } from "next";
import { Movie } from "@/lib/sanity/types/movie";
import { urlForImage } from "@/lib/sanity/helpers/image";

// Make movie optional/partial so it can be dynamic
export function setMovieMetadata(
  movie?: any,
  slug?: string
): Metadata {
  const title = movie?.title || "Post Not Found";
  
  // flatten PortableTextBlock to first text if overview exists
  const description =
    movie?.overview?.[0]?.children?.[0]?.text || "Check out this movie!";
  
  const imageUrl = movie?.poster ? urlForImage(movie.poster).url() : undefined;
  
  const movieUrl = slug ? `https://example.com/movies/${slug}` : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: movieUrl,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}
