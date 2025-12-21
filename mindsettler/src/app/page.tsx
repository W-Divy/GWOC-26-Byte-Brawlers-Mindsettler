"use client";
import HeroSection from "./components/hero_section";
import { useRef , useLayoutEffect} from "react";
import gsap from "gsap";

export default function Home() {
  const comp = useRef(null);
  const overlayTopRef = useRef(null);
  const overlayBottomRef = useRef(null);

  useLayoutEffect(() => {

        let ctx = gsap.context(() => {
            const tl = gsap.timeline();
            // Entrance Animations...
            tl.to(overlayTopRef.current, {
                height: 0, duration: 1.5, top: "-10%", ease: "power4.inOut"
            })
                .to(overlayBottomRef.current, {
                    height: 0, duration: 1.5, ease: "power4.inOut", bottom: "-10%", display: "none", delay: -1.5,
                });
        }, comp);
        return () => ctx.revert();
    }, []);
  return (
    <div ref={comp}>
      {/* <div className="bg-sage text-mist min-h-screen min-w-[dvw]"></div> */}
      <div ref={overlayTopRef} className="absolute top-0 left-0 w-full h-[50vh] bg-slate-100 z-500 flex items-end justify-center pb-4">
        <span className="text-slate-900 font-bold tracking-widest uppercase text-sm opacity-50">Inhale</span>
      </div>
      <div ref={overlayBottomRef} className="absolute bottom-0 left-0 w-full h-[50vh] bg-slate-100 z-500 flex items-start justify-center pt-4">
        <span className="text-slate-900 font-bold tracking-widest uppercase text-sm opacity-50">Exhale</span>
      </div>
      <HeroSection />
      <div className="h-screen w-screen bg-Primary-purple"></div>

    </div>
  );
}
