import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Loader = () => {
    return (
        <StyledWrapper>
            <div className="three-body">
                <div className="three-body__dot" />
                <div className="three-body__dot" />
                <div className="three-body__dot" />
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .three-body {
   --uib-size: 35px;
   --uib-speed: 0.8s;
   --uib-color: #ddd;
   position: relative;
   display: inline-block;
   height: var(--uib-size);
   width: var(--uib-size);
   animation: spin78236 calc(var(--uib-speed) * 2.5) infinite linear;
  }

  .three-body__dot {
   position: absolute;
   height: 100%;
   width: 30%;
  }

  .three-body__dot:after {
   content: '';
   position: absolute;
   height: 0%;
   width: 100%;
   padding-bottom: 100%;
   background-color: var(--uib-color);
   border-radius: 50%;
  }

  .three-body__dot:nth-child(1) {
   bottom: 5%;
   left: 0;
   transform: rotate(60deg);
   transform-origin: 50% 85%;
  }

  .three-body__dot:nth-child(1)::after {
   bottom: 0;
   left: 0;
   animation: wobble1 var(--uib-speed) infinite ease-in-out;
   animation-delay: calc(var(--uib-speed) * -0.3);
  }

  .three-body__dot:nth-child(2) {
   bottom: 5%;
   right: 0;
   transform: rotate(-60deg);
   transform-origin: 50% 85%;
  }

  .three-body__dot:nth-child(2)::after {
   bottom: 0;
   left: 0;
   animation: wobble1 var(--uib-speed) infinite
      calc(var(--uib-speed) * -0.15) ease-in-out;
  }

  .three-body__dot:nth-child(3) {
   bottom: -5%;
   left: 0;
   transform: translateX(116.666%);
  }

  .three-body__dot:nth-child(3)::after {
   top: 0;
   left: 0;
   animation: wobble2 var(--uib-speed) infinite ease-in-out;
  }

  @keyframes spin78236 {
   0% {
    transform: rotate(0deg);
   }

   100% {
    transform: rotate(360deg);
   }
  }

  @keyframes wobble1 {
   0%,
    100% {
    transform: translateY(0%) scale(1);
    opacity: 1;
   }

   50% {
    transform: translateY(-66%) scale(0.65);
    opacity: 0.8;
   }
  }

  @keyframes wobble2 {
   0%,
    100% {
    transform: translateY(0%) scale(1);
    opacity: 1;
   }

   50% {
    transform: translateY(66%) scale(0.65);
    opacity: 0.8;
   }
  }`;

export const BarLoader = () => {
    return (
        <div className="flex flex-col items-end gap-1">
            <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="h-3 w-[2px] bg-sky-400"
                        animate={{
                            height: [4, 12, 4],
                            opacity: [0.3, 1, 0.3]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
            <span className="text-[8px] uppercase tracking-widest text-sky-400/60 font-mono">
                Syncing
            </span>
        </div>
    );
};

export const GeoLoader = () => {
    return (
        <div className="flex items-center justify-center w-10 h-10">
            <div className="relative flex items-center justify-center">
                {/* Core Dot */}
                <div className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />

                {/* Pulsing Rings */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-full w-full rounded-full border border-sky-500/50"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: [0, 0.5, 0],
                            scale: [1, 2.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.6,
                            ease: "easeOut",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export const OrbitLoader = () => {
    return (
        <div className="relative w-10 h-10 flex items-center justify-center">
            {/* The Sun/Planet */}
            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />

            {/* The Orbiting Moon */}
            <motion.div
                className="absolute w-full h-full border border-white/10 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-sky-400 rounded-full" />
            </motion.div>
        </div>
    );
};

export const ScannerLoader = () => {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative w-16 h-0.5 bg-white/10 overflow-hidden rounded-full">
                {/* The Scanning Light */}
                <motion.div
                    className="absolute h-full w-1/3 bg-linear-to-r from-transparent via-sky-400 to-transparent"
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-mono animate-pulse">
                Analyzing
            </span>
        </div>
    );
};

export const WaveLoader = () => {
    return (
        <div className="flex gap-1 items-end h-4">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-0.75 bg-white/60 rounded-full"
                    animate={{
                        height: [4, 16, 4],
                        opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};