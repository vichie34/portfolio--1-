import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                    onClick={scrollToTop}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="fixed bottom-8 right-8 z-50 group"
                    aria-label="Scroll to top"
                >
                    <div className="relative">
                        {/* Background blur effect */}
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-full" />
                        
                        {/* Main button container */}
                        <div className={`
                            relative flex items-center justify-center
                            w-12 h-12 rounded-full
                            bg-gradient-to-br from-primary/90 to-primary
                            shadow-lg shadow-primary/20
                            transition-all duration-300
                            ${isHovered ? 'scale-110 shadow-xl shadow-primary/30' : 'scale-100'}
                        `}>
                            {/* Animated border */}
                            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[spin_3s_linear_infinite]" />
                            
                            {/* Icon container with hover effect */}
                            <motion.div
                                animate={{
                                    y: isHovered ? -2 : 0,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10
                                }}
                                className="relative z-10"
                            >
                                <ChevronUp className="h-6 w-6 text-primary-foreground" />
                            </motion.div>

                            {/* Tooltip */}
                            <div className={`
                                absolute bottom-full mb-2 px-3 py-1
                                bg-primary text-primary-foreground text-sm
                                rounded-full whitespace-nowrap
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-200
                                pointer-events-none
                                shadow-lg
                            `}>
                                Back to top
                            </div>
                        </div>
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop; 