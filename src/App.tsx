import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import WebsiteStatus from "./_components/status";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <WebsiteStatus />
      <Footer />
    </div>
  );
}
