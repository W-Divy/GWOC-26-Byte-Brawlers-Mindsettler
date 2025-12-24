"use client";
import React, { use, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';



// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const AboutMindSettler = () => {
    const aboutref = useRef<HTMLDivElement>(null);
    const panels: React.RefObject<HTMLElement>[] = []; // Initialize this array appropriately in your component

    const panelsRef = useRef([]);
    

    // Data for your steps
    const steps = [
        {
            id: 1,
            title: "Bridging the gap between feeling and knowing.",
            content: "MindSettler was born from a simple realization: trying to navigate life's challenges without understanding your own mind is like trying to drive without a map.",
            style: "bg-slate-900 text-blue-400",
        },
        {
            id: 2,
            title: "Processing",
            content: "As you scroll, we transition smoothly to the next context.",
            style: "bg-blue-900 text-white",
        },
        {
            id: 3,
            title: "Analysis",
            content: "The previous step fades away, replaced by critical insights.",
            style: "bg-indigo-900 text-teal-300",
        },
        {
            id: 4,
            title: "Completion",
            content: "Once this step is done, we release the scroll lock.",
            style: "bg-emerald-900 text-white",
        },
    ];


    useEffect(() => {
        const ctx = gsap.context(() => {
            const totalPanels = steps.length;
            let currentIndex = 0;

            // 1. Initial Setup: Hide all panels except the first one
            gsap.set(panelsRef.current, {  autoAlpha: 0, display: "none" });
            gsap.set(panelsRef.current[0], {  autoAlpha: 1, display: "block" });

            // 2. Create the Transition Function
            const gotoPanel = (index, isScrollingDown) => {
                if (index === currentIndex) return;

                const target = panelsRef.current[index];
                const current = panelsRef.current[currentIndex];

                // Animate Current (Outgoing)
                gsap.to(current, {
                    
                    autoAlpha: 0,
                    scale: 0.6,
                    display: "none",
                    x: isScrollingDown ?  -500 : 500, // Move opposite to scroll
                    

                    duration: 0.6,
                    ease: "power2.inOut",
                });

                // Animate Target (Incoming)
                gsap.fromTo(
                    target,
                    {  autoAlpha: 0, x: isScrollingDown ? 500 : -500 },
                    {
                        autoAlpha: 1,
                        scale: 1,
                        x: 0,
                        y:0,
                        display: "block",
                        duration: 0.6,
                        ease: "power2.inOut", // "Out" ease feels snappy for arrival
                        delay: 0.1, // Slight pause for drama
                    }
                );

                currentIndex = index;
            };

            // 3. Create the ScrollTrigger
            ScrollTrigger.create({
                trigger: aboutref.current,
                start: "center center",
                end: "+=1000", // Virtual scroll height (tweak for scroll sensitivity)
                pin: true,
                scrub: true, // Links progress to scrollbar
                snap: {
                    snapTo: 1 / (totalPanels - 1), // Calculate snap points
                    duration: 0.5,
                    delay: 0.1,
                    ease: "power1.inOut",
                },
                onUpdate: (self) => {
                    // Map scroll progress (0 to 1) to panel index (0 to 3)
                    const newIndex = Math.round(self.progress * (totalPanels - 1));

                    if (newIndex !== currentIndex) {
                        const isScrollingDown = newIndex > currentIndex;
                        gotoPanel(newIndex, isScrollingDown);
                    }
                },
            });
        }, aboutref);
        return () => ctx.revert();

    }, []);



    useEffect(() => {

        gsap.fromTo(aboutref.current,
            {
                opacity: 0,
                y: 100,
                scale: 0.7,
                borderRadius: "100px",

            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                borderRadius: "0px",
                duration: 1.2,
                scrollTrigger: {
                    trigger: aboutref.current, // Use your section ref/class
                    start: "top 90%",     // Animation starts when the top of the section hits 80% of viewport height
                    end: "top 60%",
                    toggleActions: "play none none reverse", // Plays on scroll down, reverses on scroll up
                    scrub: true,
                }

            },
        )

    }, [])

    // portrait animation
    useEffect(() => {

        const crtx = gsap.context(() => {
            gsap.fromTo(".portrait1" , {

                autoAlpha: 0,
                scale: 0.8,
                y: 500,
                rotateY:180,
            },
        {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                rotateY:0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: aboutref.current, // Use your section ref/class
                    start: "top 100%",     // Animation starts when the top of the section hits 80% of viewport height
                    toggleActions: "play none none reverse", // Plays on scroll down, reverses on scroll up
                    // scrub: true,
                }
        })
        })
        return () => crtx.revert();


    }, []);




    return (
        <div className='h-fit overflow-hidden relative w-screen '>
            {/* <div className="h-screen w-screen"> */}

            <Image src="/gradient2rev.png" alt="About Mindsettler Background"
                className="h-[40vh] w-screen absolute z-1 "
                height={500}
                width={500}
            />
            <div className='bg-white/30 absolute backdrop-blur-[2px] inset-0 m-0 p-0 z-2' />
            <div ref={aboutref} className="h-fit overflow-hidden relative bg-True-sunset  inset-0 w-screen z-5 ">
                {/* <div className='cove bg-white/30 absolute backdrop-blur-[2px] rounded inset-0 z-2' /> */}

                {/* </div> */}
                <section className="py-5 lg:py-10 bg-white">
                    <div className="container mx-auto px-6 md:px-12">

                        {/* Flex Container: Stacks on mobile (col), Side-by-side on desktop (row) */}
                        <div className="flex flex-col lg:flex-row items-center  gap-12 lg:gap-20">

                            {/* ============ LEFT SIDE: IMAGE ============ */}
                            {/* We use w-full lg:w-1/2 to take half space on desktop */}
                            <div className="w-full lg:w-1/2  relative flex justify-center lg:justify-end">

                                {/* Optional Decorative Blur behind image for depth */}
                                <div className="portrait1 absolute -inset-4 bg-purple-200/50 blur-3xl rounded-[50px] -z-10 transform rotate-3"></div>

                                {/* The Image Container with Arch Shape */}
                                {/* aspect-[3/4] forces a portrait ratio. rounded-t-[4rem] creates the arch top. */}
                                <div className="portrait1 relative w-full max-w-md aspect-[3/4] rounded-t-[4rem] rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white z-10">
                                    <img
                                        /* REPLACE WITH YOUR FOUNDER/BRAND IMAGE */
                                        src="/portrait.png"
                                        alt="Founder of MindSettler"
                                        className=" w-full h-full object-cover "
                                    />
                                </div>
                            </div>


                            {/* ============ RIGHT SIDE: CONTENT ============ */}
                            <div className="w-full lg:w-1/2 inset-0 relative h-[-webkit-fill-available] max-lg:scale-75 flex flex-col justify-center items-start">

                                {/* Small Overline Tag */}
                                <span className="inline-block  absolute top-0 mt-10  text-pink-600 font-medium tracking-wider uppercase text-sm mb-4">
                                    About MindSettler
                                </span>


                                {steps.map((step, i) => (
                                    <div
                                        key={step.id}
                                        ref={(el) => (panelsRef.current[i] = el)}
                                        className="absolute"
                                    >
                                        <h2 className="text-3xl relative   lg:text-5xl font-serif font-bold text-purple-900 mb-6 leading-tight">
                                            {step.title}
                                        </h2>
                                        <div className="space-y-1 relative text-lg text-gray-600 leading-relaxed font-sans">
                                            <p>
                                                {step.content}
                                            </p>

                                        </div>
                                        <div className="absolute bottom-10 text-sm opacity-50 uppercase tracking-widest">
                                            Part {i + 1} / {steps.length}
                                        </div>
                                    </div>
                                ))}


                                {/* Optional subtle call to action or signature area */}
                                <div className="mt-2 pt-4 border-t absolute bottom-0 mb-10 border-purple-100 flex items-center">
                                    <span className="text-purple-800 font-medium mr-4">Are you ready to find clarity?</span>
                                    <a href="#contact" className="text-pink-600 hover:text-pink-700 font-semibold underline-offset-4 hover:underline transition-all">
                                        Read Our Full Story &rarr;
                                    </a>
                                </div>

                            </div>

                        </div>
                    </div>
                </section>
                <section className="bg-white "></section>







            </div>

        </div>
    );


};

export default AboutMindSettler;