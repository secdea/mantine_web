import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "@/components/Welcome/Welcome";

export default function HomePage() {
  return (
    <>
    <h1>Mantine React Table</h1>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
