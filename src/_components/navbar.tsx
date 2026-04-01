import { images } from "../config/routing/images.route";
import { pages } from "../config/routing/pages.route";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex items-center px-6 py-5">
                <a href={pages.ROOT}>
                    <img src={images.STATUS} alt="Qualsu logo" className="h-7 opacity-90 hover:opacity-100 transition-opacity duration-200" />
                </a>
            </div>
        </nav>
    );
}