export default function Navbar() {
    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 text-white backdrop-blur-sm">
                <div className="container mx-auto flex justify-between items-center p-4">
                    <a href="/">
                        <img src="logo/logo.svg" alt="Qualsu logo" className="h-8" />
                    </a>
                </div>
            </nav>
        </>
    );
}