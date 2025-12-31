
const Vignette = () => {
    return (
        <>
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black z-10" />
            <div
                className="absolute inset-0 z-10"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.8) 100%)'
                }}
            />
        </>
  )
}

export default Vignette