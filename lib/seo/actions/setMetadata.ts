import { Metadata } from "next";
import { urlForImage } from "@/lib/sanity/helpers/image";

export function setMetadata(item: Metadata & { image?: ImageBitmap } | null): Metadata {
  const title = item?.title ?? "Movie Not Found";
  const description = item?.description ?? "No description available.";
  const imageUrl = item?.image ? urlForImage(item.image).url() : null;

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
