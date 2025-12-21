"use client";
import React, { useLayoutEffect, useRef, useEffect, Suspense } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import Shuffle from './Shuffle_text';
import { TextGenerateEffect } from './text_generate_effect';
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center, Environment, PerspectiveCamera } from '@react-three/drei'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugin immediately
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- HELPER: Forces Canvas to Resize when Animation Ends ---
function ResizeHandler() {
    const { gl, camera } = useThree();
    useEffect(() => {
        const handleResize = () => {
            const parent = gl.domElement.parentElement;
            if (parent) {
                gl.setSize(parent.clientWidth, parent.clientHeight);
                camera.updateProjectionMatrix();
            }
        };
        // Listen to window resize to fix the 3D aspect ratio dynamically
        window.addEventListener('resize', handleResize);

        // Initial call
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [gl, camera]);
    return null;
}

const MindsettlerHero = ({ divRef }) => {
    const comp = useRef(null);
    const overlayTopRef = useRef(null);
    const overlayBottomRef = useRef(null);
    const heroImageRef = useRef(null);
    const headlineRef = useRef(null);
    const subheadRef = useRef(null);
    const ctaRef = useRef(null);
    const circleRef = useRef(null);

    // 1. Move Preload Outside to prevent memory leaks
    useLayoutEffect(() => {
        useGLTF.preload('/3ds/base_basic_pbr.glb')
    }, [])

    function Model({ url }: { url: string }) {
        const { scene } = useGLTF(url)
        const meshRef = useRef<any>(null)

        useLayoutEffect(() => {
            if (!meshRef.current) return
            const ctx = gsap.context(() => {

                // 2. THE ANIMATION FIX
                gsap.to(meshRef.current.rotation, {
                    y: Math.PI * 2.5,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".wrapper",
                        start: "top bottom", // Starts when top of wrapper hits bottom of screen
                        end: "bottom top",   // Ends when bottom of wrapper hits top of screen
                        scrub: 1,
                        invalidateOnRefresh: true, // CRITICAL: Recalculates start/end on resize
                        markers: false, // Set to true to debug where the start/end lines are
                    }
                })
            })
            return () => ctx.revert()
        }, [])

        return (
            <Center>
                <primitive
                    ref={meshRef}
                    object={scene}
                    rotation={[0, Math.PI * 1.3, 0]}
                    scale={1.8}
                />
            </Center>
        )
    }

    useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            window.history.scrollRestoration = 'manual';
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }

        let ctx = gsap.context(() => {
            const tl = gsap.timeline();
            gsap.set([subheadRef.current, ctaRef.current], { y: 100, opacity: 0 });

            // Entrance Animations...
            tl.to(overlayTopRef.current, {
                height: 0, duration: 1.5, top: "-10%", ease: "power4.inOut"
            })
                .to(overlayBottomRef.current, {
                    height: 0, duration: 1.5, ease: "power4.inOut", bottom: "-10%", display: "none", delay: -1.5,
                });

            // Image...
            tl.fromTo(heroImageRef.current,
                { scale: 1.3, filter: "blur(10px)" },
                { scale: 1, filter: "blur(0px)", duration: 2, ease: "power2.out" }, "-=1.0"
            );

            // Circle Entrance...
            tl.fromTo(circleRef.current,
                { scale: 0, opacity: 0 },
                {
                    scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)",
                    onComplete: () => {
                        window.dispatchEvent(new Event('resize'));
                        ScrollTrigger.refresh();
                    }
                },
                "-=1.5"
            );

            // Text...
            tl.to(headlineRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=1")
                .to(subheadRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=1.2")
                .to(ctaRef.current, { y: 0, opacity: 0.8, duration: 1, ease: "power3.out" }, "-=0.8"); // Fixed opacity typo

            // Float animation removed - handled by ScrollPage component

        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp} className="relative w-screen h-screen  bg-soft-calm text-white font-sans">
            {/* ... Overlays ... */}
            <div ref={overlayTopRef} className="absolute top-0 left-0 w-full h-[50vh] bg-slate-100 z-50 flex items-end justify-center pb-4">
                <span className="text-slate-900 font-bold tracking-widest uppercase text-sm opacity-50">Inhale</span>
            </div>
            <div ref={overlayBottomRef} className="absolute bottom-0 left-0 w-full h-[50vh] bg-slate-100 z-50 flex items-start justify-center pt-4">
                <span className="text-slate-900 font-bold tracking-widest uppercase text-sm opacity-50">Exhale</span>
            </div>
            <div className="absolute text-center top-0 right-0">
                <Image
                    src="/abstractlines.png"
                    alt="Abstract Lines"
                    width={500}
                    height={500}
                    className="opacity-100 lg:opacity-40"
                />
            </div>

            <div className="flex max-h-screen h-fit absolute flex-row-reverse ml-auto items-center  justify-between w-screen  px-4 md:px-12 py-20 mx-auto  gap-8 lg:gap-12">

                <div ref={divRef} className="relative z-40 wrapper bg-transparent rounded-full will-change-scroll  w-[50vw] h-[300px] md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] flex items-center justify-center">

                    <div ref={circleRef} className="w-full h-full absolute z-40 bg-transparent">
                        <Canvas frameloop='always'>
                            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} near={0.1} far={1000} />
                            <ambientLight intensity={0.5} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                            <Environment preset="city" />

                            <Suspense fallback={null}>
                                <Model url="/3ds/base_basic_pbr.glb" />
                            </Suspense>

                            <ResizeHandler />
                            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                        </Canvas>
                    </div>
                </div>
                {/* TEXT SECTION */}
                <div className="relative z-20 left-0 flex flex-col justify-center  w-[50vw] lg:w-1/2 order-2 lg:order-1">

                    {/* ... Text Content ... */}
                    {/* (Kept your text content here mostly the same) */}
                    <div className="max-w-2xl mx-auto  lg:mx-0 mt-16">
                        <div className=" mb-1 text- lg:text-left">
                            <p className="text-frozenWater font-medium tracking-widest uppercase text-xs md:text-sm">Reclaim Your Inner Space</p>
                        </div>
                        <h1 ref={headlineRef} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2  lg:text-left">
                            {/* ... Shuffle Component ... */}
                            <Shuffle
                                text="Understand the"
                                shuffleDirection="right"
                                duration={0.5}
                                animationMode="evenodd"
                                shuffleTimes={2}
                                ease="power3.out"
                                stagger={0.05}
                                threshold={0.1}
                                triggerOnce={false}
                                triggerOnHover={true}
                                respectReducedMotion={true}
                                className="text-blueGray"
                                style={{
                                    fontSize: 'clamp(2rem, 8vw, 4rem)',
                                    fontFamily: 'inherit'
                                }}
                            />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-teal-200">Chaos Within.</span>
                        </h1>
                        <div ref={subheadRef} className="text-base md:text-md lg:text-lg text-frozenWater mb-2 leading-relaxed max-w-lg mx-auto lg:mx-0  lg:text-left">
                            <TextGenerateEffect words={"MindSettler is a psycho-education and mental well-being platform offering structured online and offline sessions to help you understand your thoughts, emotions, and life challenges in a safe and confidential space."} duration={0.6} staggerDelay={0.15} />
                        </div>
                        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-start">
                            <button className="px-6 md:px-8 py-3 md:py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(20,184,166,0.5)]">Book Consultation</button>
                        </div>
                    </div>
                </div>

                {/* --- 3D SECTION --- */}

                {/* 3. CSS FIX: Added min-h-[500px] and w-full so ScrollTrigger has a valid height to measure */}
                {/* <div ref={divRef} className="wrapper relative w-[50vw] bg-softBlosssom rounded-full h-fit  flex items-center justify-center z-20 order-1 lg:order-2"> */}

                {/* 4. CSS FIX: Changed absolute positioning to relative or ensured parent has height */}

            </div>

        </div>


    );
};

export default MindsettlerHero;