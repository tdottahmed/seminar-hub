
import NavBar from '@/Components/Welcome/NavBar';
import Footer from '@/Components/Welcome/Footer';
import FloatingActions from '@/Components/Welcome/FloatingActions';
import { usePage } from '@inertiajs/react';

export default function GuestLayout({ children, canLogin, canRegister }) {
    
    return (
        <div className="bg-slate-900 min-h-screen text-slate-200 selection:bg-indigo-500/30">
             <NavBar canLogin={canLogin} canRegister={canRegister} />
            
            <main>
                {children}
            </main>

            <FloatingActions />
            <Footer />
        </div>
    );
}
