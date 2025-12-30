import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import waterfall from '../assets/videos/waterfall.mp4'
import deepSea from '../assets/videos/deep-sea.mp4'
import goat from '../assets/videos/goat.mp4'
import { motion, AnimatePresence } from 'framer-motion';
import squid from '../assets/videos/squid.mp4'

interface Specie {
    name: string,
    vidSrc: string | null,
    imgSrc: string | null,
    detail: string
}

const PanelA = () => {
    return (
        <div className='bg-neutral-950 h-full relative overflow-hidden w-full'>
            <motion.video
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-0 left-0 h-full w-full object-cover opacity-40"
                src={waterfall}
                autoPlay loop muted playsInline
            />

            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

            <div className='relative z-10 flex flex-col items-center justify-between text-white h-full w-full p-12'>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center mt-20"
                >
                    <h1 className='uppercase tracking-[0.2em] text-[5rem] font-black leading-none bg-clip-text text-transparent bg-linear-to-b from-white to-white/20'>
                        Oasis
                    </h1>
                </motion.div>

                <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
                    <motion.p
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className='max-w-md text-sm leading-relaxed font-light tracking-wide text-slate-400'
                    >
                        Experience the untouched serenity of the deep wild. Where the water meets the soul and time stands perfectly still.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        className='text-right'
                    >
                        <h2 className='uppercase text-4xl font-light tracking-tighter text-sky-400'>Lake Beach</h2>
                        <div className="h-[1px] w-24 bg-sky-500 ml-auto my-2" />
                        <p className='text-[10px] uppercase tracking-widest text-white/50'>Latitude 4.2N • Longitude 11.5E</p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

const PanelB = () => {
    const [species] = useState<Specie[]>([
        // {
        //     name: 'Abbatoir Tearer',
        //     detail: 'A relentless predator of the deep, known for its bioluminescent lures and razor-sharp efficiency.',
        //     vidSrc: "../assets/video/squid.mp4",
        //     imgSrc: null
        // },
        // {
        //     name: 'Saw Shark',
        //     detail: 'Equipped with a unique, tooth-lined snout, this ancient species navigates the seafloor with unmatched precision.',
        //     vidSrc: "vid2.mp4",
        //     imgSrc: null
        // },
        // {
        //     name: 'Ghost Chimera',
        //     detail: 'A cartilaginous relic of the abyss, utilizing sensitive lateral lines to detect the faintest electrical pulses of prey.',
        //     vidSrc: "vid3.mp4",
        //     imgSrc: null
        // },
        {
            name: 'Vampire Squid',
            detail: 'Residing in the oxygen-minimum zone, it deploys velvet-like webbing and photophores to vanish into the dark.',
            vidSrc: squid,
            imgSrc: null
        },
        // {
        //     name: 'Glaucus Atlanticus',
        //     detail: 'The Blue Dragon. A pelagic nudibranch that floats on the surface tension of the open ocean, armored in toxic cerata.',
        //     vidSrc: "vid5.mp4",
        //     imgSrc: null
        // },
        // {
        //     name: 'Ribbon Eel',
        //     detail: 'A protandric hermaphrodite that shifts colors and form as it matures, mimicking the fluid motion of sea currents.',
        //     vidSrc: "vid6.mp4",
        //     imgSrc: null
        // }
    ]);

    const [activeSpecie, setActiveSpecie] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSpecie((prev) => (prev < species.length - 1 ? prev + 1 : 0));
        }, 6000); // Increased time to allow reading
        return () => clearInterval(interval);
    }, [species.length]);

    const current = species[activeSpecie];

    return (
        <div className='bg-neutral-950 h-full relative overflow-hidden w-full text-white' style={{ paddingBottom: `calc(25px + env(safe-area-inset-bottom))` }}>
            {/* Background Video with subtle zoom animation */}
            <motion.video
                key="bg-video"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-0 left-0 h-full w-full object-cover opacity-60"
                src={deepSea}
                autoPlay loop muted playsInline
            />

            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/80 z-0" />

            <div className="relative z-10 flex flex-col items-center h-full w-full px-8 py-2">
                {/* Header Section */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className='text-center mb-12'
                >
                    <h1 className='text-7xl font-serif tracking-tighter'>Oceania</h1>
                    <p className='text-sm uppercase tracking-[0.3em] text-sky-400 font-light'>The Fishing Hub</p>
                </motion.div>

                {/* Main Content: AnimatePresence allows components to animate out when the key changes */}
                <div className='flex-1 flex flex-col items-center justify-center max-w-2xl w-full'>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSpecie}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className='flex flex-col items-center'
                        >
                            <div className='relative h-60 w-full mb-8 rounded-2xl overflow-hidden shadow-2xl border border-white/10'>
                                <motion.video
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                    src={current.vidSrc || undefined}
                                    autoPlay loop muted playsInline
                                    className='object-cover w-full h-full pointer-events-none'
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                            </div>

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className='text-5xl font-medium mb-2 text-center'
                            >
                                {current.name}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className='text-lg text-center font-extralight leading-relaxed text-slate-300 italic'
                            >
                                "{current.detail}"
                            </motion.p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Refined Navigation Dots with Active State Animation */}
                <div className='flex space-x-4 py-1 absolute bottom-0'>
                    {species.map((_, idx) => (
                        <div key={idx} className="relative flex items-center justify-center">
                            {idx === activeSpecie && (
                                <motion.div
                                    layoutId="outline"
                                    className="absolute w-5 h-5 border border-sky-500 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <div
                                className={`w-2 h-2 rounded-full transition-colors duration-500 ${idx === activeSpecie ? 'bg-sky-400' : 'bg-slate-600'
                                    }`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const PanelC = () => {
    return (
        <div className='bg-neutral-950 h-full relative overflow-hidden w-full'>
            <video
                className="absolute top-0 left-0 h-full w-full object-cover"
                src={goat}
                autoPlay
                loop
                muted
                playsInline
            />

            {/* 2. The Overlay Layer (Darkens the video) */}
            <div className="absolute top-0 left-0 h-full w-full bg-black/90"></div>
        </div>
    )
}

const PanelD = () => {
    return (
        <div className='bg-neutral-950 h-screen'>
            <h1 className='text-neutral-50'>Panel D</h1>
        </div>
    )
}

interface ProgressGuideProps {
    currentIndex: number;
    total: number;
    onNext: () => void;
    onPrev: () => void;
}
const ProgressGuide = ({ currentIndex, total, onNext, onPrev }: ProgressGuideProps) => {
    
    const progressHeight = ((currentIndex + 1) / total) * 100;

    return (
        <div className="fixed right-1 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6">
            {/* Slim Down Arrow */}
            <motion.button
                onClick={onPrev}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="mb-4 text-white/50 hover:text-white transition-colors"
            >
                <ChevronUp size={20} strokeWidth={1} />
            </motion.button>

            {/* Minimalist Vertical Line */}
            <div className="relative w-0.5 h-32 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 w-full bg-sky-500"
                    initial={{ height: 0 }}
                    animate={{ height: `${progressHeight}%` }}
                    transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
                />
            </div>

            {/* Current Index Indicator */}
            {/* <div className="flex flex-col items-center gap-1 font-mono text-[10px] tracking-tighter text-white/40">
                <span className="text-sky-400 text-xs font-bold">0{currentIndex + 1}</span>
                <div className="w-4 h-[1px] bg-white/20" />
                <span>0{total}</span>
            </div> */}

            {/* Slim Down Arrow */}
            <motion.button
                onClick={onNext}
                whileHover={{ y: 5 }}
                whileTap={{ scale: 0.9 }}
                className="mt-4 text-white/50 hover:text-white transition-colors"
            >
                <ChevronDown size={20} strokeWidth={1} />
            </motion.button>
        </div>
    );
};

const panels = [PanelA, PanelB, PanelC, PanelD]

const Display = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const isTransitioning = useRef(false);

    const movePanel = (direction: "next" | "prev") => {
        if (isTransitioning.current) return;

        setActiveIndex((prev) => {
            if (direction === "next") {
                return prev < panels.length - 1 ? prev + 1 : prev; // Stops at end
            } else {
                return prev > 0 ? prev - 1 : prev; // Stops at start
            }
        });

        isTransitioning.current = true;
        setTimeout(() => { isTransitioning.current = false; }, 800);
    };

    useEffect(() => {
        const touchStart = { y: 0 };

        // 1. Desktop Wheel Event
        const handleWheel = (e: WheelEvent) => {
            
            if (Math.abs(e.deltaY) < 30 || isTransitioning.current) return;

            if (e.deltaY > 0) {
                movePanel("next");
            } else {
                movePanel("prev");
            }
        };

        // 2. Desktop Keyboard Event (Arrows)
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isTransitioning.current) return;

            if (e.key === "ArrowDown" || e.key === "PageDown") {
                movePanel("next");
            } else if (e.key === "ArrowUp" || e.key === "PageUp") {
                movePanel("prev");
            }
        };

        // 3. Mobile/Tablet Touch Events
        const handleTouchStart = (e: TouchEvent) => {
            touchStart.y = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (isTransitioning.current) return;

            const touchEnd = e.changedTouches[0].clientY;
            const distance = touchStart.y - touchEnd;

            // threshold of 70px ensures they meant to swipe
            if (Math.abs(distance) > 70) {
                distance > 0 ? movePanel("next") : movePanel("prev");
            }
        };

        // --- Attach Events ---
        
        window.addEventListener("wheel", handleWheel, { passive: true });
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });

        // 4. Cleanup Phase
        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [activeIndex]); 

    return (
        <div className="h-dvh w-full overflow-hidden bg-black relative">
            <motion.div
                className="flex flex-col h-full w-full"
                animate={{ y: `-${activeIndex * 100}%` }}
                transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
            >
                <section className="h-dvh w-screen shrink-0"><PanelA /></section>
                <section className="h-dvh w-screen shrink-0"><PanelB /></section>
                <section className="h-dvh w-screen shrink-0"><PanelC /></section>
                <section className="h-dvh w-screen shrink-0"><PanelD /></section>
            </motion.div>

            <ProgressGuide
                currentIndex={activeIndex}
                total={4}
                onNext={() => movePanel("next")}
                onPrev={() => movePanel("prev")}
            />
        </div>
    );
};

export default Display