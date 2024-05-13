import * as React from "react";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import controls from "../../data/debugControls";

export default function SphereObjects({ contacts }) {
  // useRef
  const smallestSphereRef = useRef();
  const smallSphereRef = useRef();

  // useState
  const [n, setN] = useState(4);

  // leva debug panel controls
  const debugControls = controls();

  // constants
  const smallestSphereArgs = [
    n / 1.75, // 2.5 //  n / 1.75,
    n * 8,
    n * 8,
    0,
    Math.PI * 2,
    0,
    Math.PI,
  ];
  const smallSphereArgs = [n / 1.75, n * 2, n * 2, 0, Math.PI * 2, 0, Math.PI];

  // useFrame
  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime / 6;
    smallestSphereRef.current.rotation.y = angle * debugControls.smallestSpin;
    smallSphereRef.current.rotation.y = angle * debugControls.smallSpin;
  });

  // useEffect
  useEffect(() => {
    setN(contacts.length);
  }, []);

  // function for sphere (main/smallest) object
  const sphereMain = () => {
    return (
      <mesh
        ref={smallestSphereRef}
        visible={debugControls.visible}
        position={[
          debugControls.position.x,
          debugControls.position.y,
          debugControls.position.z,
        ]}
        scale={debugControls.smallestScale}
      >
        <sphereGeometry args={smallestSphereArgs} />
        <MeshDistortMaterial
          distort={debugControls.smallestDistortion}
          speed={debugControls.smallestSpeed}
          color={debugControls.smallestColor}
          wireframe={false}
          side={THREE.DoubleSide}
          opacity={debugControls.centralSphereOpacity}
          transparent
          depthTest={true}
          flatShading={true}
        />
      </mesh>
    );
  };
  return (
    <>
      <Float
        speed={debugControls.floatSpeed}
        floatIntensity={debugControls.floatIntensity}
      >
        {/* smallest sphere / central / main sphere */}
        {sphereMain()}
        {/* outer sphere slightly larger than central/smallest sphere */}
        <mesh
          ref={smallSphereRef}
          visible={debugControls.visible}
          position={[
            debugControls.position.x,
            debugControls.position.y,
            debugControls.position.z,
          ]}
          scale={debugControls.smallScale}
        >
          <sphereGeometry args={smallSphereArgs} />
          <MeshDistortMaterial
            distort={debugControls.smallDistortion}
            speed={debugControls.smallSpeed}
            color={debugControls.smallColor}
            wireframe={debugControls.wireframe}
            depthTest={true}
            opacity={debugControls.outerSpheresOpacity}
            transparent
          />
        </mesh>
      </Float>
    </>
  );
}
