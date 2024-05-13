import * as React from "react";
import { Suspense, useEffect, useRef } from "react";
import { Cloud, Sky, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import controls from "../../data/debugControls";
import CubeAndSpheres from "./CubeAndSpheres";

export default function Experience({ contacts, perfVisible }) {
  // useRef
  const orbitRef = useRef();

  // leva debug panel controls
  const debugControls = controls();

  // useEffect
  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.autoRotateSpeed = 0.5;
      orbitRef.current.autoRotate = true;
    }
  }, []);

  useEffect(() => {
    // prevent swipe back navigation gesture on iOS mobile devices
    const element = document.querySelector("canvas");
    element.addEventListener("touchstart", (e) => {
      setIsTouching(true);
      // is not near edge of view, exit
      if (e.pageX > 20 && e.pageX < window.innerWidth - 20) return;
      // prevent swipe to navigate gesture
      e.preventDefault();
    });

    return () => {
      element.removeEventListener("touchstart", (e) => {
        // prevent swipe to navigate gesture
        console.log("removed event listener, 'touchstart'");
      });
    };
  }, []);

  return (
    <>
      <color args={["#e8e8e8"]} attach="background" />
      <fog args={["#d8d8d8", 0, 180]} attach="fog" />

      {debugControls.perfVisible && <Perf position="top-left" />}
      <OrbitControls makeDefault ref={orbitRef} maxDistance={150} />

      <directionalLight position={[1, 2, 3]} intensity={10.5} />
      <ambientLight intensity={1.5} />
      <Sky
        distance={900000}
        sunPosition={[20, 10, 150]}
        inclination={0}
        azimuth={0.75}
        onClick={() => {
          orbitRef.current.autoRotate = false;
        }}
      />
      <Cloud
        bounds={[15, 10, 5]}
        concentrate="inside"
        scale={[7, 8, 10]}
        volume={20}
        fade={200}
        speed={0.0015}
        opacity={0.8}
      />
      <Suspense fallback={null}>
        <CubeAndSpheres contacts={contacts} orbitRef={orbitRef} />
      </Suspense>
    </>
  );
}
