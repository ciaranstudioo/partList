import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import Experience from "../components/scene/Experience.jsx";
import { useLoaderData } from "react-router-dom";
import { getContacts } from "../data/contacts.js";

export async function loader({ request }) {
  const url = new URL(request.url);
  const contacts = await getContacts();
  return { contacts };
}

export default function CanvasLayout({ hideDebug, perfVisible }) {
  const { contacts } = useLoaderData();

  return (
    <>
      <Leva hidden={hideDebug} collapsed oneLineLabels />
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-2, -7.25, -50],
        }}
        id="three-canvas"
      >
        <Experience contacts={contacts} perfVisible={perfVisible} />
      </Canvas>
    </>
  );
}
