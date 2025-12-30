import React from 'react'
import videoBg from '../assets/videos/intro-vid.mp4'
import {OrbitLoader as Loader} from '../../component/Loader'
import { motion } from 'framer-motion';

const Intro = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden bg-black"
            style={{ paddingBottom: `calc(17px + env(safe-area-inset-bottom))` }}
        >
            {/* 1. The Video Layer with scale animation */}
            <motion.video
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-cover"
                src={videoBg}
                autoPlay
                loop
                muted
                playsInline
            />

            {/* 2. Sophisticated Vignette Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/40" />

            {/* 3. The Content Layer */}
            <div className="relative z-10 h-full w-full flex flex-col justify-end items-end p-10 md:p-20">

                {/* Main Heading Reveal */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-end"
                >
                    <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter text-white uppercase leading-none">
                        Welcome to <span className="font-serif italic text-sky-400">Oasis</span>
                    </h1>

                    {/* Subline and Loader Container */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className='flex items-center gap-6 mt-4'
                    >
                        <p className="text-sm md:text-lg uppercase tracking-[0.4em] text-white/60 font-light">
                            More than a planet
                        </p>

                        {/* Assuming Loader is a component, we can wrap it or just place it */}
                        <div className="w-12 h-px bg-sky-500/50" />
                        <Loader />
                    </motion.div>
                </motion.div>

                {/* Decorative corner element */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 right-10 w-32 h-px bg-linear-to-l from-white/40 to-transparent origin-right"
                />
            </div>
        </div>
    );
};

export default Intro