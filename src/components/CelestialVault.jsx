import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const CelestialVault = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: "#0F0F0F",
                },
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "parallax", // Subtle parallax on mouse move
                        parallax: {
                            enable: true,
                            force: 20, // Minima sensation depth
                            smooth: 10
                        }
                    },
                },
            },
            particles: {
                color: {
                    value: ["#ffffff", "#D5F1FF", "#a3cfff", "#ffcccc", "#001133"], // Star palette
                },
                move: {
                    enable: true,
                    direction: "none",
                    random: false,
                    speed: 0.2, // Very slow drift, almost static but alive
                    straight: false,
                    outModes: {
                        default: "out"
                    }
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 300, // Dense starfield
                },
                opacity: {
                    value: { min: 0.1, max: 1 }, // Twinkle effect range
                    animation: {
                        enable: true,
                        speed: 1, // Twinkle speed
                        sync: false,
                        startValue: "random",
                        mode: "auto"
                    },
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 0.5, max: 1.5 }, // Small fine points
                },
            },
            detectRetina: true,
        }),
        [],
    );

    if (init) {
        return (
            <Particles
                id="tsparticles"
                options={options}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    pointerEvents: 'none' // Let clicks pass through
                }}
            />
        );
    }

    return <></>;
};

export default CelestialVault;
