import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <NavBar />
      <Hero />
      <Projects />
    </main>
  );
}