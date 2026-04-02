import { images } from '../config/routing/images.route';
import { links } from '../config/routing/links.route';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="px-3 pb-5 sm:px-6 md:px-8 lg:px-10">
            <div className="section-shell mx-auto mt-2 w-full max-w-270 rounded-[1.75rem] py-6 sm:py-8">
                <div className="relative z-10 mx-auto w-full max-w-5xl">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <span className="flex items-center sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src={images.LOGO} className="h-4" alt="Qualsu logo" />
                            <span className="text-white">|</span>
                            <img src={images.STATUS} className="h-6" alt="Status" />
                        </span>
                        <div className="flex items-center gap-5">
                            <a href={links.QUALSU.SITE} target="_blank" rel="noreferrer" className="text-xs text-white/50 transition-colors duration-200 hover:text-white/80">Site</a>
                            <a href={links.FEEDBACK.SITE} target="_blank" rel="noreferrer" className="text-xs text-white/50 transition-colors duration-200 hover:text-white/80">Feedback</a>
                            <a href={links.QSU_ID.SITE} target="_blank" rel="noreferrer" className="text-xs text-white/50 transition-colors duration-200 hover:text-white/80">Qual ID</a>
                        </div>
                    </div>
                    <hr className="my-5 border-white/10" />
                    <span className="block text-xs text-white/40 sm:text-center">
                        © 2021-{currentYear}
                        <a href={links.QUALSU.SITE} target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-white/75"> Qualsu</a>
                    </span>
                </div>
            </div>
        </footer>
    );
}