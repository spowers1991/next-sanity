import { Metadata } from "next";
import { urlForImage } from "@/lib/sanity/helpers/image";
import { SanityDocument } from '@/lib/sanity/types/sanityDocument'

// Make post optional/partial so it can be dynamic
export function setMetadata(
  body?: SanityDocument,
): Metadata {
  const title = body?.title || "Post Not Found";
  
  // flatten PortableTextBlock to first text if overview exists
  const description =
    body?.overview?.[0]?.children?.[0]?.text || "Check out this post!";
  
  const imageUrl = body?.poster ? urlForImage(body.poster).url() : undefined;
  
  //const postUrl = slug ? `https://localhost:3000/${post._type}/${slug}` : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      //url: postUrl,
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
