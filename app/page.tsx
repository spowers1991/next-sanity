import PostsMenu from "@/components/PostsMenu";

export default async function PostPage() {
  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-3xl font-bold mb-6">
        All Posts
      </h1>
      <PostsMenu />
    </main>
  );
}
