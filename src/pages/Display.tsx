/* eslint-disable react-hooks/purity */
import { ChevronDown, ChevronUp, Github, Mail, MessageSquare, Send, CheckCircle2, Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import waterfall from '../assets/videos/waterfall.mp4'
import deepSea from '../assets/videos/deep-sea.mp4'
import shark from '../assets/videos/shark.mp4'
import forestView from '../assets/videos/forest-view.mp4'
import shrineView from '../assets/videos/shrine-view.mp4'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import squid from '../assets/videos/squid.mp4'
import Vignette from '../../component/Vignette'
import BgVideo from '../../component/BgVideo'

const ContactForm = () => {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleTransmit = async () => {
        if (!message.trim()) return;

        setStatus("sending");

        try {
            const response = await fetch("https://formspree.io/f/mnjnaqpn", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: message, _subject: "New Oasis Feedback" }),
            });

            if (response.ok) {
                setStatus("success");
                setMessage(""); // Clear the box
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
            console.log(error)
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full bg-white/[0.03] border border-white/10 rounded-sm p-6 backdrop-blur-sm mb-12 relative overflow-hidden"
        >
            <AnimatePresence mode="wait">
                {status !== "success" ? (
                    <motion.div key="form" exit={{ opacity: 0, y: -10 }}>
                        <p className="text-[11px] font-mono text-emerald-500/60 mb-4 uppercase tracking-widest">
                            // {status === "error" ? "Transmission Failed - Retry?" : "Drop a feedback or recommendation"}
                        </p>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={status === "sending"}
                            placeholder="Type your message here..."
                            className="w-full bg-transparent border-none outline-none text-sm font-light leading-relaxed placeholder:text-neutral-700 h-24 resize-none text-white disabled:opacity-50"
                        />
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={handleTransmit}
                                disabled={status === "sending" || !message.trim()}
                                className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white transition-colors disabled:cursor-not-allowed"
                            >
                                {status === "sending" ? (
                                    <>Transmitting <Loader2 size={12} className="animate-spin" /></>
                                ) : (
                                    <>Transmit <Send size={12} /></>
                                )}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="h-32 flex flex-col items-center justify-center text-center"
                    >
                        <CheckCircle2 size={24} className="text-emerald-500 mb-2 opacity-80" />
                        <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.3em]">Signal Received</p>
                        <button
                            onClick={() => setStatus("idle")}
                            className="mt-4 text-[8px] text-neutral-600 hover:text-neutral-400 uppercase tracking-widest"
                        >
                            Send another
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

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
                        <div className="h-px w-24 bg-sky-500 ml-auto my-2" />
                        <p className='text-[10px] uppercase tracking-widest text-white/50'>Latitude 4.2N • Longitude 11.5E</p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

interface Specie {
    name: string;
    detail: string;
    vidSrc: string | null;
    imgSrc: string | null;
    depth: string;
    scientificName: string;
}

const PanelB = () => {
    const [species] = useState<Specie[]>([
        {
            name: 'Saw Shark',
            scientificName: 'Pristiophoriformes',
            detail: 'Equipped with a unique, tooth-lined snout, this ancient species navigates the seafloor with unmatched precision.',
            depth: '40-900m',
            vidSrc: shark,
            imgSrc: null
        },
        {
            name: 'Vampire Squid',
            scientificName: 'Vampyroteuthis infernalis',
            detail: 'Residing in the oxygen-minimum zone, it deploys velvet-like webbing and photophores to vanish into the dark.',
            depth: '600-1200m',
            vidSrc: squid,
            imgSrc: null
        }
    ]);

    const [activeSpecie, setActiveSpecie] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setActiveSpecie((prev) => (prev < species.length - 1 ? prev + 1 : 0));
        }, 8000);

        return () => clearInterval(interval);
    }, [species.length, isAutoPlaying]);

    const current = species[activeSpecie];

    const handleDotClick = (idx: number) => {
        setActiveSpecie(idx);
        setIsAutoPlaying(!isAutoPlaying);
        // Resume autoplay after 12 seconds of inactivity
        setTimeout(() => setIsAutoPlaying(true), 12000);
    };

    return (
        <div className='bg-neutral-950 h-full relative overflow-hidden w-full text-white'>

            {/* Background Video with breathing effect */}
            <motion.video
                key="bg-video"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute top-0 left-0 h-full w-full object-cover opacity-40"
                src={deepSea}
                autoPlay loop muted playsInline
            />

            {/* Enhanced gradient overlays */}
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/80 z-0" />
            <div className="absolute inset-0 bg-linear-to-t from-cyan-950/20 to-transparent z-0" />

            <div className="relative z-10 flex flex-col items-center h-full w-full px-6 md:px-12 py-8">

                {/* Header Section */}
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className='text-center mb-8 md:mb-12'
                >
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="h-px w-12 bg-linear-to-r from-transparent to-cyan-500/50" />
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </div>
                        <div className="h-px w-12 bg-linear-to-l from-transparent to-cyan-500/50" />
                    </div>

                    <h1 className='text-6xl md:text-8xl font-serif tracking-tighter mb-2'>Oceania</h1>
                    <p className='text-[10px] uppercase tracking-[0.3em] text-cyan-400/80 font-medium'>
                        Deep Sea Research Station
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className='flex-1 flex flex-col items-center justify-center max-w-4xl w-full'>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={activeSpecie}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className='flex flex-col items-center w-full'
                        >
                            {/* Video/Creature Container */}
                            <div className='relative w-full'>

                                {/* Scanning grid overlay */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 0.15, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                    className="absolute inset-0 z-10 pointer-events-none"
                                />

                                <div className='relative h-72 md:h-96 w-full rounded-2xl border border-cyan-500/20 overflow-hidden'>
                                    <video
                                        key={current.vidSrc}
                                        src={current.vidSrc || undefined}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className='object-cover w-full h-full mix-blend-screen'
                                        style={{
                                            filter: 'brightness(1.1) contrast(1.2)'
                                        }}
                                    />

                                    {/* Bottom fade */}
                                    {/* <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" /> */}
                                </div>
                            </div>

                            {/* Species Information */}
                            <div className="text-center space-y-3 max-w-2xl">

                                {/* Species name */}
                                <motion.h2
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className='text-5xl md:text-6xl font-semibold tracking-tight text-white mb-4'
                                >
                                    {current.name}
                                </motion.h2>

                                {/* Description */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="relative"
                                >
                                    <p className='text-base md:text-lg text-center font-light leading-relaxed text-slate-300 max-w-xl mx-auto px-4'>
                                        {current.detail}
                                    </p>

                                    {/* Decorative quotes */}
                                    <span className="absolute -left-2 -top-2 text-4xl text-cyan-500/20 font-serif">"</span>
                                    <span className="absolute -right-2 -bottom-6 text-4xl text-cyan-500/20 font-serif">"</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Dots */}
                <div className='flex items-center gap-6 py-6'>
                    <div className="h-px w-8 bg-linear-to-r from-transparent to-cyan-500/30" />

                    <div className='flex space-x-4'>
                        {species.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleDotClick(idx)}
                                className="relative flex items-center justify-center cursor-pointer group"
                                aria-label={`View ${species[idx].name}`}
                            >
                                {idx === activeSpecie && (
                                    <>
                                        <motion.div
                                            layoutId="outline"
                                            className="absolute w-7 h-7 border border-cyan-400/60 rounded-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                        <motion.div
                                            className="absolute w-5 h-5 bg-cyan-500/10 rounded-full"
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </>
                                )}
                                <div
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-500 
                                        ${idx === activeSpecie
                                            ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                                            : 'bg-slate-600 group-hover:bg-slate-500'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="h-px w-8 bg-linear-to-l from-transparent to-cyan-500/30" />
                </div>

                {/* Status indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-[9px] font-mono tracking-wider text-cyan-400/40 uppercase"
                >
                    Specimen {activeSpecie + 1} of {species.length} • Auto-rotate {isAutoPlaying ? 'Active' : 'Paused'}
                </motion.div>
            </div>

            {/* Scanning line effect */}
            <motion.div
                animate={{
                    y: ["0%", "100%"],
                    opacity: [0, 0.3, 0]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 3
                }}
                className="absolute left-0 w-full h-[2px] bg-linear-to-r from-transparent via-cyan-500/50 to-transparent z-20 pointer-events-none"
            />
        </div>
    );
};

const PanelC = () => {
    const [random, setRandom] = useState(0.765);

    useEffect(() => {
        const interval = setInterval(() => {
            setRandom(Math.random());
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='bg-neutral-950 h-full relative overflow-hidden w-full text-white'>

            {/* Background Video with breathing effect */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                className="absolute inset-0"
            >
                <BgVideo src={forestView} animate={{ scale: 1 }} transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }} initial={{ scale: 1.1 }} />
            </motion.div>

            <Vignette />

            <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-20">
                {/* TOP LEFT: Scientific Telemetry */}
                <div className="flex flex-col gap-3">
                    <div className="font-mono text-[10px] text-white/50 leading-relaxed space-y-0.5">
                        <p>TEMP: {(24 + random * 2).toFixed(1)}°C</p>
                        <p>ELEV: {(1200 + random * 50).toFixed(0)}m</p>
                        <p className="text-emerald-400/60">STATUS: ACTIVE</p>
                    </div>
                </div>
            </div>

            {/* Floating particles with improved motion */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-emerald-300/30 rounded-full blur-[2px]"
                    initial={{ y: -20, x: `${Math.random() * 100}%`, opacity: 0 }}
                    animate={{
                        y: "110vh",
                        opacity: [0, 0.6, 0.8, 0],
                        x: `${Math.random() * 100}%`
                    }}
                    transition={{
                        duration: Math.random() * 8 + 12,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 2
                    }}
                />
            ))}

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col justify-end h-full w-full px-6 pb-16 md:px-20 md:pb-24">

                {/* Environment Stats */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex gap-6 md:gap-10 mb-8 border-l-2 border-emerald-500/40 pl-5"
                >
                    <div>
                        <p className="text-[9px] uppercase tracking-[0.25em] text-emerald-400/80 mb-1">Oxygen</p>
                        <p className="text-2xl md:text-3xl font-light tracking-tight">24<span className="text-base text-white/50">%</span></p>
                    </div>
                    <div>
                        <p className="text-[9px] uppercase tracking-[0.25em] text-emerald-400/80 mb-1">Humidity</p>
                        <p className="text-2xl md:text-3xl font-light tracking-tight">88<span className="text-base text-white/50">%</span></p>
                    </div>
                    <div>
                        <p className="text-[9px] uppercase tracking-[0.25em] text-emerald-400/80 mb-1">Flora</p>
                        <p className="text-xl md:text-2xl font-light tracking-tight text-emerald-400">Extreme</p>
                    </div>
                </motion.div>

                {/* Main Text Content */}
                <div className='max-w-3xl'>
                    <motion.h1
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className='text-6xl md:text-8xl font-bold tracking-tighter leading-[0.88] mb-6'
                    >
                        THE GREAT <br />
                        <span className="text-emerald-400 italic font-serif tracking-tight">FOREST</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className='text-sm md:text-lg tracking-wide font-light leading-relaxed text-white/60 max-w-xl'
                    >
                        Home to ancient biological relics and a legendary atmosphere that
                        defies modern physics. The canopy stretches beyond sight, creating
                        a self-sustaining ecosystem where time feels irrelevant.
                    </motion.p>
                </div>

                {/* Scanning line animation */}
                <motion.div
                    animate={{
                        scaleX: [0, 1, 0],
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 2
                    }}
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-linear-to-r from-transparent via-emerald-500/50 to-transparent origin-left"
                />
            </div>
        </div>
    )
}

const PanelD = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [glitchActive, setGlitchActive] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [0, window.innerHeight], [5, -5]);
    const rotateY = useTransform(mouseX, [0, window.innerWidth], [-5, 5]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 150);
        }, 8000);

        return () => {
            clearInterval(timeInterval);
            clearInterval(glitchInterval);
        };
    }, []);

    const timeString = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    return (
        <div className='bg-neutral-950 relative overflow-hidden h-full w-full text-white'>

            {/* Background Video - Your Original */}
            <BgVideo src={shrineView} animate={{ scale: glitchActive ? 1.02 : 1 }} transition={{ duration: 0.1 }} />

            {/* Scanline Effect */}
            <motion.div
                animate={{ y: ['0%', '100%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background: 'linear-gradient(transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
                    height: '200px'
                }}
            />

            {/* Grid Overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}
            />
            
            {/* Top Right - Live Status */}
            <div className="absolute top-[1%] right-[4%] z-index">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-row items-center gap-2"
                >
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                    </div>
                    <p className="text-[11px] font-mono text-amber-600/40">{timeString}</p>
                </motion.div>
            </div>

            {/* Vignette */}
            <Vignette />

            {/* Floating Particles - Mystical Feel */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-600/40 rounded-full blur-px"
                    initial={{ y: -20, x: Math.random() * 100 + "%", opacity: 0 }}
                    animate={{
                        y: "100vh",
                        opacity: [0, 1, 0],
                        x: (Math.random() * 100 + 5) + "%"
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10
                    }}
                />
            ))}

            {/* Glitch Effect Overlay */}
            {glitchActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 z-30 pointer-events-none"
                    style={{
                        background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0px, transparent 2px, transparent 4px)',
                    }}
                />
            )}

            {/* Main Content */}
            <motion.div
                className="relative z-20 flex flex-col justify-center items-center h-full w-full px-8 md:px-20"
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            >
                <div className="max-w-5xl w-full">

                    {/* Sacred Symbol */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex justify-center mb-12"
                    >
                        <div className="relative">
                            {/* Rotating Outer Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-0 w-32 h-32 border border-amber-500/30 rounded-full"
                            />

                            {/* Counter-Rotating Inner Ring */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-2 w-28 h-28 border border-amber-400/40 rounded-full"
                            />

                            {/* Center Icon */}
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.6, 1, 0.6]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="w-16 h-16 border-2 border-amber-500/60 rounded-full flex items-center justify-center"
                                >
                                    <div className="w-8 h-8 bg-linear-to-br from-amber-500/40 to-amber-600/20 rounded-full" />
                                </motion.div>
                            </div>

                            {/* Orbital dots */}
                            {[0, 120, 240].map((angle, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
                                    className="absolute inset-0 w-32 h-32"
                                    style={{ transformOrigin: 'center' }}
                                >
                                    <div
                                        className="absolute w-2 h-2 bg-amber-400 rounded-full"
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            transform: `rotate(${angle}deg) translateY(-70px)`
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Title Section */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="text-center mb-8"
                    >
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex items-center justify-center gap-4 mb-4"
                        >
                            <div className="h-px w-20 bg-linear-to-r from-transparent via-amber-500/50 to-amber-500/50" />
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50" />
                            <div className="h-px w-20 bg-linear-to-l from-transparent via-amber-500/50 to-amber-500/50" />
                        </motion.div>

                        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-2">
                            <span className="bg-linear-to-b from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                                聖域
                            </span>
                        </h1>

                        <p className="text-3xl md:text-5xl font-light tracking-[0.2em] text-amber-400/80 mb-6">
                            SANCTUARY
                        </p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="text-sm md:text-base text-white/50 font-light tracking-wide max-w-2xl mx-auto leading-relaxed"
                        >
                            A place where ancient spirits dwell, guarded by time itself.
                            The veil between worlds grows thin, and whispers of the old gods
                            echo through the sacred grounds.
                        </motion.p>
                    </motion.div>

                    {/* Sacred Metrics */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className="flex items-center justify-around"
                    >
                        <div className="text-center">
                            <motion.p
                                className="text-3xl md:text-4xl font-light text-amber-400 mb-1"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                1247
                            </motion.p>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Years Standing</p>
                        </div>

                        <div className="w-px bg-linear-to-b from-transparent via-amber-500/30 to-transparent" />

                        <div className="text-center">
                            <motion.p
                                className="text-3xl md:text-4xl font-light text-amber-400 mb-1"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            >
                                ∞
                            </motion.p>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Spiritual Energy</p>
                        </div>

                        <div className="w-px bg-linear-to-b from-transparent via-amber-500/30 to-transparent" />

                        <div className="text-center">
                            <motion.p
                                className="text-3xl md:text-4xl font-light text-amber-400 mb-1"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                            >
                                3
                            </motion.p>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Guardian Deities</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Atmospheric Light Rays */}
            <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-full w-1 bg-linear-to-b from-amber-500/0 via-amber-500/10 to-amber-500/0"
                        initial={{ x: `${20 + i * 30}%`, opacity: 0 }}
                        animate={{
                            opacity: [0, 0.3, 0],
                            x: `${20 + i * 30 + 5}%`
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            delay: i * 3,
                            ease: 'linear'
                        }}
                        style={{ transform: 'skewX(-15deg)' }}
                    />
                ))}
            </div>
        </div>
    );
};

const ClosePanel = () => {
    return (
        <div className='bg-black h-full relative overflow-hidden w-full text-white flex flex-col justify-center items-center px-8'>

            {/* 1. Background: The "Void" (Anticlimax) */}
            {/* No heavy video here—just a subtle, breathing radial glow */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-neutral-900 via-black to-black"
            />

            {/* 2. Content Container */}
            <div className="relative z-10 max-w-xl w-full flex flex-col items-center">

                {/* Header: The "Quiet" Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-[10px] tracking-[0.5em] uppercase text-neutral-500 mb-4">Final Fantasy</h2>
                    <h1 className="text-4xl font-extralight tracking-tighter">Send Me A Message</h1>
                </motion.div>

                {/* Feedback Area: Mimics a Terminal Note */}
                <ContactForm />

                {/* Footer: Creator Contact */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col items-center gap-8"
                >
                    <div className="flex gap-12">
                        <a href="mailto:royalman3355@gmail.com" className="group flex flex-col items-center gap-2">
                            <Mail size={18} className="text-neutral-600 group-hover:text-white transition-all" />
                            <span className="text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Email</span>
                        </a>
                        <a href="https://github.com/Royalman3d" target='_blank' rel='noopener' className="group flex flex-col items-center gap-2">
                            <Github size={18} className="text-neutral-600 group-hover:text-white transition-all" />
                            <span className="text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Github</span>
                        </a>
                        <a href="https://www.instagram.com/beyond_strs" rel='noopener' target='_blank' className="group flex flex-col items-center gap-2">
                            <MessageSquare size={18} className="text-neutral-600 group-hover:text-white transition-all" />
                            <span className="text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Social</span>
                        </a>
                    </div>

                    <p className="text-[10px] text-neutral-600 tracking-[0.2em] uppercase mt-4">
                        Designed & Created by Royal Man // Oasis 2025
                    </p>
                </motion.div>

            </div>

            {/* 3. Subtle Animated Grain Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
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

            {currentIndex ? <motion.button
                onClick={onPrev}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="mb-4 text-white/50 hover:text-white transition-colors"
            >
                <ChevronUp size={20} strokeWidth={1} />
            </motion.button> : null}

            {/* Minimalist Vertical Line */}
            <div className="relative w-0.5 h-32 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 w-full bg-sky-500"
                    initial={{ height: 0 }}
                    animate={{ height: `${progressHeight}%` }}
                    transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
                />
            </div>

            {/* Slim Down Arrow */}
            {currentIndex + 1 !== total && <motion.button
                onClick={onNext}
                whileHover={{ y: 5 }}
                whileTap={{ scale: 0.9 }}
                className="mt-4 text-white/50 hover:text-white transition-colors"
            >
                <ChevronDown size={20} strokeWidth={1} />
            </motion.button>}
        </div>
    );
};

const panels = [PanelD, PanelA, PanelB, PanelC, ClosePanel]

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

            if (Math.abs(distance) > 70) {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
                <section className="h-dvh w-screen shrink-0"><PanelC /></section>
                <section className="h-dvh w-screen shrink-0"><PanelD /></section>
                <section className="h-dvh w-screen shrink-0"><PanelB /></section>
                <section className="h-dvh w-screen shrink-0"><ClosePanel /></section>
            </motion.div>

            <ProgressGuide
                currentIndex={activeIndex}
                total={panels.length}
                onNext={() => movePanel("next")}
                onPrev={() => movePanel("prev")}
            />
        </div>
    );
};

export default Display