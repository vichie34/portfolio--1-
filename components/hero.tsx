import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { words } from "../constants"
// import HeroExperience from "./model/HeroExperience";
import GradientSphere from "./GradientSphere";
import { Canvas } from "@react-three/fiber";

const Hero = () => {
    useGSAP(() => {
        gsap.fromTo(
            ".hero-text h1",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
        );
    });

    return (
        <section id="hero" className="relative overflow-hidden">
            <div className="absolute inset-0 z-10"> {/* Use inset-0 to cover the full parent */}
                <img src="/bg.png" alt="" className="w-full h-full object-cover" /> {/* Make image cover the div */}
            </div>

            <div className="hero-layout">
                {/* LEFT: Hero Content */}
                <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
                    <div className="flex flex-col gap-7 md:gap-10">
                        <div className="hero-text">
                            <h1>
                                Shaping
                                <span className="slide">
                                    <span className="wrapper">
                                        {words.map((word, index) => (
                                            <span
                                                key={index}
                                                className="flex items-center md:gap-3 gap-1 pb-2"
                                            >
                                                <img
                                                    src={word.imgPath}
                                                    alt="person"
                                                    className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-blue-100"
                                                />
                                                <span>{word.text}</span>
                                            </span>
                                        ))}
                                    </span>
                                </span>
                            </h1>
                            <h1>into Real Projects</h1>
                            <h1>that Deliver Results</h1>
                        </div>
                    </div>
                </header>

                {/* RIGHT: 3D Model or Visual */}
                <figure className="hidden md:block w-5/12 h-full absolute right-0 top-0">
                    <div className="flex justify-center items-center w-full h-full">
                        <Canvas>
                            {/* Add lighting here */}
                            <ambientLight intensity={0.5} /> {/* Soft ambient light */}
                            <directionalLight position={[5, 5, 5]} intensity={1} /> {/* Directional light */}
                            <GradientSphere />
                        </Canvas>
                    </div>
                </figure>
            </div>

        </section>
    );
};

export default Hero;
