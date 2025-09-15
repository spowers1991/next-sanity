import type { Post } from "@/lib/sanity/types/Post";
import type { PortableTextBlock } from "@portabletext/types";

export interface Movie extends Omit<Post, "_type" | "publishedAt" | "body"> {
  _type: "movie";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  externalId: number;
  name: string;
  overview: PortableTextBlock[]; // assuming overview is rich text
  popularity: number;
  poster: {
    _type: "image";
    asset: {
      _ref?: string;
      _type: "reference";
      _id?: string;
      url?: string;
    };
    crop?: {
      _type: "sanity.imageCrop";
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    hotspot?: {
      _type: "sanity.imageHotspot";
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
  releaseDate: string;
  castMembers: Array<{
    _key: string;
    characterName?: string;
    person: {
      _type: "reference";
      _ref: string;
    };
  }>;
  crewMembers: Array<{
    _key: string;
    job?: string;
    person: {
      _type: "reference";
      _ref: string;
    };
  }>;
}
