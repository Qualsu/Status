import { images } from "../config/routing/images.route";
import { pages } from "../config/routing/pages.route";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 sm:px-6 md:px-8 lg:px-10">
            <div className="surface-panel mx-auto flex max-w-270 items-center justify-between rounded-2xl px-4 py-3 sm:px-5 sm:py-4">
                <a href={pages.ROOT} className="inline-flex items-center">
                    <img src={images.STATUS} alt="Qualsu status" className="h-7" />
                </a>
            </div>
        </nav>
    );
}