import React from 'react'
import {motion} from "framer-motion"

interface BGProps {
    src: string;
    animate: object | undefined ;
    transition: object | undefined;
    initial: object | undefined;
}

const BgVideo = ({src, animate=undefined, transition=undefined, initial=undefined}: BGProps) => {
  return (
      <motion.video
          initial={initial || undefined}
          animate={animate || undefined}
          transition={transition || undefined}
          className="absolute top-0 left-0 h-full w-full object-cover"
          src={src}
          autoPlay
          loop
          muted
          playsInline
      />
  )
}

export default BgVideo