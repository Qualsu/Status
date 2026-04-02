import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import WebsiteStatus from "./_components/status";

export default function App() {
  return (
    <div className="relative isolate min-h-screen text-white">
      <Navbar />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-120 bg-[radial-gradient(circle_at_top,rgba(164,93,255,0.16),transparent_55%)]" />
      <WebsiteStatus />
      <Footer />
    </div>
  );
}
