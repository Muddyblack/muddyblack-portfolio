import NavBar from "@/components/NavBar";
import StudyMaterials from '@/components/StudyMaterials';

export const metadata = {
  title: 'Study Materials - Digital Learning Resources',
  description: 'Interactive study materials and documentation for computer vision, networking, and digital image processing.',
};

export default function StudyMaterialsPage() {
  return (
    <main className="min-h-screen bg-background">
      <NavBar />
      <StudyMaterials />
    </main>
  );
}