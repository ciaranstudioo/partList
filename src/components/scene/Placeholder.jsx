import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Placeholder(props) {
  // useRef
  const sphereRef = useRef();

  // useFrame
  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    sphereRef.current.rotation.y = angle;
  });

  return (
    <mesh {...props} ref={sphereRef}>
      <sphereGeometry args={[5, 6, 6]} />
      <meshBasicMaterial wireframe color="black" />
    </mesh>
  );
}
