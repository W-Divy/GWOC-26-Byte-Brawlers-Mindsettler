"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import dynamic from 'next/dynamic';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ShatterSection from "./ShatterSection";
import MindsettlerHero from "./StoryJourney";

export default function Home() {
  const movingDivRef = useRef<HTMLDivElement | null>(null);
  const sectionBRef = useRef<HTMLElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // We don't need setInterval anymore because we are passing the Ref directly
    // Wait one tick to ensure Refs are populated
    const ctx = gsap.context(() => {

      // 1. TRANSLATION ANIMATION (Moves the 3D wrapper from Hero to Section B)
      if (movingDivRef.current && sectionBRef.current) {

        // Explicitly set initial z-index so it stays on top of Section B
        gsap.set(movingDivRef.current, { zIndex: 100, position: 'relative' });

        gsap.fromTo(movingDivRef.current,
          {
            xPercent: 0,
            yPercent: 0,
            y: 0,
            scale: 1,
          },
          {
            xPercent: -200, // Adjust this value based on how far left you want it
            y: 600,         // Adjust based on how far down you want it
            scale: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: mainRef.current, // Start when the Page starts scrolling
              start: "top top",
              endTrigger: sectionBRef.current,
              end: "center center", // Finish when Section B is centered
              scrub: 1,
            },
          }
        );
      }

      // 2. TILE ANIMATION (Shatter Section)
      const tiles = sectionBRef.current?.querySelectorAll(".tile") || [];
      if (tiles.length > 0) {
        gsap.from(tiles, {
          scrollTrigger: {
            trigger: sectionBRef.current,
            start: "top bottom",
            end: "top center",
            scrub: 1.5,
          },
          scale: 0,
          opacity: 0,
          rotation: 45,
          x: () => (Math.random() - 0.5) * 1200,
          y: () => (Math.random() - 0.5) * 1200,
          stagger: { amount: 1, from: "center" },
        });
      }

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="overflow-visible ">
      {/* 1. We pass movingDivRef to the Hero. The Hero attaches it to the 3D Wrapper. */}

      <div className="relative z-50">

        <MindsettlerHero divRef={movingDivRef} />
      </div>

      {/* 2. Section B */}
      <div className="z-4">

        <ShatterSection ref={sectionBRef} />
      </div>
    </main>
  );
}
