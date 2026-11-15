import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

/** Public website chrome. The /admin panel has its own layout. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="noise-overlay" />
      <ScrollProgress />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
