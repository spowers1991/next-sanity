// components/Header.tsx
import MainMenu from "./[MainMenu]/MainMenu"; // or "./PostsMenu" if that's the actual file
import { Post } from "@/lib/sanity/types/Post";

interface HeaderProps {
  post: Post; // or Post[] if you're passing multiple posts
}

export default function Header({ post }: HeaderProps) {
  return (
    <header className="w-full">
      <MainMenu />
    </header>
  );
}
