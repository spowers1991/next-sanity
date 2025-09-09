import { sanityClient } from "@/lib/sanity/api/client";
import { ALL_MOVIES_QUERY } from "@/lib/sanity/queries/getAllMovies";
import { Post } from "@/lib/sanity/types/post";
import MenuItem from './MenuItem'

export default async function PostsMenu() {
  
  const posts = (await sanityClient.fetch(ALL_MOVIES_QUERY)) as Post[];

  return (
    <div className="flex w-full py-3 px-3">
      <ul className="ml-auto flex gap-2">
        {posts.map((post) => (
          <MenuItem key={post._id} post={post} />
        ))}
      </ul>
    </div>
  );
}
