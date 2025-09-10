import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity/api/client";
import type { Post } from "@/lib/sanity/types/Post";
import { POST_QUERY } from "@/lib/sanity/queries/getCurrentPost";
import PostsMenu from "@/components/[Header]/[MainMenu]/MainMenu";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  // Fetch post by slug
  const post = (await sanityClient.fetch(POST_QUERY, { slug })) as Post | null;

  if (!post) return notFound();

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <PostsMenu />
      <h1 className="text-4xl font-bold mb-4">
        {
          post.title
        }
      </h1>
      <p className="mb-8 text-gray-500">
        {
          new Date(post.publishedAt).toLocaleDateString()
        }
      </p>

      <div className="max-w-4xl mx-auto">
        {
          post?.overview[0].children[0].text
        }
      </div>

    </main>
  );
}
