import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import LandingBackground from "../components/LandingBackground";

gsap.registerPlugin(TextPlugin);

// Use forwardRef so parent can trigger animation restart
const Home = forwardRef((props, ref) => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const tlRef = useRef(null);

    useImperativeHandle(ref, () => ({
        restartAnimations: () => {
            // Kill existing timeline
            if (tlRef.current) tlRef.current.kill();
            startAnimation();
        }
    }));

    const startAnimation = () => {
        const words = ["VISUALISE", "UNDERSTAND", "CODE"];
        const tl = gsap.timeline({ repeat: 0 });
        tlRef.current = tl;

        words.forEach((word) => {
            tl.to(subtitleRef.current, {
                text: word,
                opacity: 1,
                duration: 1.6,
                ease: "power2.out",
            })
                .to(subtitleRef.current, {
                    opacity: 0,
                    duration: 1.0,
                    delay: 0.4,
                    ease: "power1.inOut",
                })
                .to(
                    titleRef.current,
                    {
                        scale: 1.03,
                        duration: 0.35,
                        yoyo: true,
                        repeat: 1,
                        ease: "power1.inOut",
                    },
                    "<"
                );
        });
    };

    useEffect(() => {
        startAnimation();
        return () => tlRef.current?.kill();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-black">
                {/* Force remount on Home restart using random key */}
                <LandingBackground key={Math.random()} />

                <div className="relative z-10 text-white px-4 text-center">
                    <h1
                        ref={titleRef}
                        className="text-5xl md:text-8xl font-semibold tracking-wide drop-shadow-2xl"
                    >
                        SORTIFY
                    </h1>
                    <p
                        ref={subtitleRef}
                        className="text-xl md:text-4xl mt-6 font-normal text-gray-300 font-light"
                    >
                        {/* Animated words appear here */}
                    </p>
                </div>
            </section>

            {/* Info Section */}
            <section
                className="flex-1 px-6 py-16 text-left text-gray-200"
                style={{ backgroundColor: "#0f172a" }}
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-white">
                        About Sortify
                    </h2>
                    <p className="mb-8 text-2xl leading-relaxed">
                        Sortify is an interactive platform designed to help you{" "}
                        <span className="font-semibold text-indigo-400">
                            visualize, understand, and implement{" "}
                        </span>
                        sorting algorithms. Our goal is to make learning data structures and algorithms engaging and intuitive.
                    </p>

                    <h3 className="text-2xl md:text-4xl font-semibold mb-4 text-white">
                        Sorting Algorithms
                    </h3>
                    <p className="text-2xl leading-relaxed">
                        Sorting algorithms are techniques used to rearrange elements in a list or array into a specific order—typically ascending or descending. They're foundational in computer science because they optimize searching, data presentation, and algorithmic efficiency in larger systems.
                    </p>
                    <p className="text-2xl leading-relaxed mt-4">
                        There are hundreds of sorting algorithms, each with unique characteristics. They are primarily classified by:
                        <li className="text-2xl mx-10 my-2">
                            <span className="font-semibold text-indigo-400">Time Complexity:</span> How fast they run as input size grows.
                        </li>
                        <li className="text-2xl mx-10">
                            <span className="font-semibold text-indigo-400">Space Complexity:</span> How much memory they use.
                        </li>
                    </p>
                    <p className="text-2xl leading-relaxed mt-4">
                        These complexitites are expressed using asymptotic notations:
                        <li className="text-2xl mx-10">
                            <span className="font-semibold text-indigo-400">O(n) : </span>Upper bound (worst-case)
                        </li>
                        <li className="text-2xl mx-10">
                            <span className="font-semibold text-indigo-400">Θ(n) : </span>Tight bound (average-case)
                        </li>
                        <li className="text-2xl mx-10">
                            <span className="font-semibold text-indigo-400">Ω(n) : </span>Upper bound (best-case)
                        </li>
                    </p>
                    <p className="text-xl leading-relaxed mt-2">Where n is the number of elements in the input data structure</p>
                </div>
            </section>
        </div>
    );
});

export default Home;

