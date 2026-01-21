import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';
import clsx from 'clsx';
import { usePage } from '@inertiajs/react';

export default function Toast() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    useEffect(() => {
        if (flash.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 4000);
            return () => clearTimeout(timer);
        }
        if (flash.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 5000); // Errors stay a bit longer
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-4 py-3 rounded-xl bg-white shadow-2xl border border-slate-100 max-w-sm"
                >
                     {/* Icon */}
                     <div className={clsx(
                         "p-2 rounded-full",
                         type === 'success' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                     )}>
                         {type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                     </div>

                     {/* Content */}
                     <div className="flex-1">
                         <h4 className={clsx(
                             "text-sm font-bold",
                             type === 'success' ? "text-emerald-900" : "text-red-900"
                         )}>
                             {type === 'success' ? 'Success' : 'Error'}
                         </h4>
                         <p className="text-sm text-slate-500 line-clamp-2">{message}</p>
                     </div>

                     {/* Close Button */}
                     <button 
                        onClick={() => setVisible(false)}
                        className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
                     >
                         <X size={16} />
                     </button>
                     
                     {/* Progress Bar (Optional nice touch) */}
                     <motion.div 
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: type === 'success' ? 4 : 5, ease: "linear" }}
                        className={clsx(
                            "absolute bottom-0 left-0 h-1 rounded-full",
                             type === 'success' ? "bg-emerald-500" : "bg-red-500"
                        )}
                        style={{ borderBottomRightRadius: '0.75rem', borderBottomLeftRadius: '0.75rem' }}
                     />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
