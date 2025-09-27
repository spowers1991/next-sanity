import { Metadata } from "next";
import type { Movie } from "@/types/sanity/Movie";
import { urlForImage } from "@/lib/sanity/helpers/image";

export function setMetadata(movie: Movie | null): Metadata {
  const title = movie?.title ?? "Movie Not Found";
  const description = movie?.overview?.[0]?.children?.[0]?.text ?? "Check out this movie!";
  const imageUrl = movie?.poster ? urlForImage(movie.poster).url() : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
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
