import type { SanityImage } from "./sanityImage";
import type { PortableTextBlock } from "./portableText";

// Main Sanity document type
export interface SanityDocument {
  _id: string;
  _type: string;
  title?: string;
  slug?: { current: string };
  overview?: PortableTextBlock[];
  poster?: SanityImage;
  [key: string]: unknown; // allow extra dynamic fields
}
