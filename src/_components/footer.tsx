import { images } from '../config/routing/images.route';
import { links } from '../config/routing/links.route';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="fixed bottom-0 left-0 right-0 px-6 py-4 border-t border-white/5">
            <div className="flex items-center justify-between max-w-2xl mx-auto flex-col md:flex-row gap-y-4">
                <a href={links.QUALSU.SITE} target="_blank" rel="noreferrer">
                    <img src={images.LOGO} className="h-4 opacity-70 hover:opacity-100 transition-opacity duration-200" alt="Qualsu" />
                </a>
                <div className="flex items-center gap-5">
                    <a href={links.QUALSU.SITE} target="_blank" rel="noreferrer" className="text-xs text-white/50 hover:text-white/70 transition-colors duration-150">Site</a>
                    <a href={links.FEEDBACK.SITE} target="_blank" rel="noreferrer" className="text-xs text-white/50 hover:text-white/70 transition-colors duration-150">Feedback</a>
                    <a href={links.QSU_ID.SITE} target="_blank" rel="noreferrer" className="text-xs text-white/50 hover:text-white/70 transition-colors duration-150">Qual ID</a>
                </div>
                <span className="text-xs text-white/30">
                    © 2021-{currentYear} 
                    <a href={links.QUALSU.SITE} target='_blank' className='hover:text-white/70 transition-colors duration-150'> Qualsu</a>
                </span>
            </div>
        </footer>
    );
}