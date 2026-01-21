import { motion } from "framer-motion";

export default function Logo({ className = "h-10" }) {
    return (
        <div className="relative group flex items-center justify-center">
            {/* Dynamic Background Shape/Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-xl rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
            <div className="absolute inset-0 bg-indigo-500/10 blur-md rounded-full animate-pulse"></div>

            {/* Logo Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
            >
                {/* 
                   Using the LIGHT logo because we are on a dark background.
                   This looks much more natural than a box.
                */}
                <img
                    src="/assets/logo/Logo-prochesta-IT-light-1.png"
                    alt="Prochesta IT Logo"
                    className={`${className} w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]`}
                />
            </motion.div>
        </div>
    );
}
