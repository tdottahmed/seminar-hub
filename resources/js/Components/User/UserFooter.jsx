export default function UserFooter() {
    return (
        <footer className="mt-auto py-6 px-8 border-t border-gray-100 bg-white">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Prochesta IT. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
                </div>
            </div>
        </footer>
    );
}
