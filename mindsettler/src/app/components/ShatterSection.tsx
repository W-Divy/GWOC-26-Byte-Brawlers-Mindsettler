// ShatterSection.js
import { Center } from "@react-three/drei/core/Center";
import { Suspense, useLayoutEffect, useRef } from "react";
import { forwardRef } from "react";
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei'

const ShatterSection = forwardRef((props, ref) => {
  const rows = 5;
  const cols = 5;
  const tiles = Array.from({ length: rows * cols });

  function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url)
    const meshRef = useRef<any>(null)

    

    return (
      <Center>
        <primitive
          ref={meshRef}
          object={scene}
          rotation={[0, Math.PI * 1.7, 0]}
          scale={1.1}
        />
      </Center>
    )
  }

  return (
    <section
      ref={ref}
      className="relative h-screen w-full bg-pink5  z-1"
    >
      <div className=" text-center mt-20 absolute  my-auto rounded-2xl z-25 h-100 w-100 left-40">
        <Canvas frameloop='always'>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} near={0.1} far={1000} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <Environment preset="city" />

          <Suspense fallback={null}>
            <Model url="/3ds/patient_male.glb" />
          </Suspense>


          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>
      <div
        className="grid relative w-full h-full  z-5"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`
        }}
      >
        {tiles.map((_, i) => {
          const x = (i % cols) * 25; // Calculation for 5x5 grid
          const y = Math.floor(i / cols) * 25;

          return (

            <div key={i}
              className="tile bg-cover  absolute  z-5 "
              style={{
                backgroundImage: "url('/section21.png')",
                backgroundSize: "500% 500%",
                backgroundPosition: `${x}% ${y}%`
              }} ></div>
          );
        })}
      </div>
    </section>
  );
});

ShatterSection.displayName = "ShatterSection";
export default ShatterSection;