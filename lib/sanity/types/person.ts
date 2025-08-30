import type { Post } from "@/lib/sanity/types/post";

export interface Person extends Omit<Post, "_type" | "publishedAt" | "body"> {
  _type: "movie";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  externalId: number;
  name: string;
}
