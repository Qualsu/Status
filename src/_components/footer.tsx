export default function Footer(){
    return (
        <footer className="bg-black/20 backdrop-blur-sm rounded-lg shadow m-4 mx-10">
            <div className="w-full mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://qual.su" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="/logo/full-logo.png" className="w-60" alt="Qualsu logo"/>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
                        <li>
                            <a href="https://qual.su" target="_blank" className="hover:underline me-4 md:me-6">Site</a>
                        </li>
                        <li>
                            <a href="https://feedback.qual.su" target="_blank" className="hover:underline me-4 md:me-6">Feedback</a>
                        </li>
                        <li>
                            <a href="https://id.qual.su" target="_blank" className="hover:underline me-4 md:me-6">Qual ID</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
                <span className="block text-sm sm:text-center text-gray-400">© 2021-2025 <a href="https://qual.su" className="hover:underline">Qualsu</a></span>
            </div>
        </footer>
    )
}