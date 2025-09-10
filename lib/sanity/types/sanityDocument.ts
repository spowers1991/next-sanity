import type { SanityImage } from "./SanityImage";
import type { PortableTextBlock } from "./PortableText";

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
