// components/Header.tsx
import MainMenu from "./[MainMenu]/MainMenu"; // or "./PostsMenu" if that's the actual file

export default function Header() {
  return (
    <header className="w-full">
      <MainMenu />
    </header>
  );
}
