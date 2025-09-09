import Link from "next/link";
import { sanityClient } from "@/lib/sanity/api/client";
import { ALL_MOVIES_QUERY } from "@/lib/sanity/queries/getAllMovies";
import { Post } from "@/lib/sanity/types/post";

export default async function PostsMenu() {
  
  const posts = (await sanityClient.fetch(ALL_MOVIES_QUERY)) as Post[];

  return (
    <div className="flex w-full py-3 px-3">
      <ul className="ml-auto flex gap-2">
        {posts.map((post) => (
          post._type === "post" ?
          <li key={post._id} className="hover:underline">
            <Link href={`/${post?.slug?.current}`}>
              {
                post.title ? post.title : post.name
              }
            </Link>
          </li>
          :
          <li key={post._id} className="hover:underline">
            <Link href={`/${post._type}s/${post?.slug?.current}`}>
              {
                post.title ? post.title : post.name
              }
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
