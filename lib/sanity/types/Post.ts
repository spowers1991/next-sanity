import type { PortableTextBlock } from "@portabletext/types";

export type Post = {
  _id: string;
  _type: "post";
  title: string;
  name: string;
  slug: { current: string };
  publishedAt: string;
  overview: PortableTextBlock[];
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
  body: PortableTextBlock[];
};
