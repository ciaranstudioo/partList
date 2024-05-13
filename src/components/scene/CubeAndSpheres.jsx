import * as React from "react";
import { useRef } from "react";
import * as THREE from "three";
import { Geometry, Base, Subtraction } from "@react-three/csg";
import controls from "../../data/debugControls";
import SphereObjects from "./SphereObjects";
import TextDetails from "./TextDetails";
import { CUBE_FRAME } from "../../data/constants";

export default function CubeAndSpheres({ contacts, orbitRef }) {
  // useRef
  const bottomScreenRef = useRef();

  // leva debug panel controls
  const debugControls = controls();

  // functions for cube surfaces / line frames
  const windowPlane = (
    inner,
    [argW, argH],
    [positionX, positionY, positionZ],
    rotationX,
    rotationY,
  ) => {
    return (
      <mesh
        position={[positionX, positionY, positionZ]}
        rotation-x={rotationX}
        rotation-y={rotationY}
      >
        <meshPhongMaterial
          color={inner ? debugControls.innerFrame : debugControls.outerFrame}
          side={THREE.DoubleSide}
          opacity={0.85}
          transparent
          shininess={50}
          specular="#909090"
        />
        <Geometry>
          <Base>
            <planeGeometry args={[argW, argH]} />
          </Base>
          <Subtraction>
            <planeGeometry
              args={[
                argW - CUBE_FRAME.windowSubtraction,
                argH - CUBE_FRAME.windowSubtraction,
              ]}
            />
          </Subtraction>
        </Geometry>
      </mesh>
    );
  };

  const screenPlane = (
    ref,
    [argW, argH],
    [positionX, positionY, positionZ],
    rotationX,
    onClick,
    opacity,
    visible,
    wireframe,
  ) => {
    return (
      <mesh
        ref={ref}
        position={[positionX, positionY, positionZ]}
        rotation-x={rotationX}
        onClick={onClick}
      >
        <planeGeometry args={[argW, argH]} />
        <meshPhongMaterial
          color={debugControls.screenColor}
          opacity={opacity}
          transparent
          visible={visible}
          wireframe={wireframe}
          depthTest={true}
        />
      </mesh>
    );
  };

  return (
    <>
      <SphereObjects contacts={contacts} />
      <TextDetails contacts={contacts} screenPlane={screenPlane} />

      {/* Inner cube box */}
      {/* Top and bottom */}
      <mesh
        ref={bottomScreenRef}
        position={[0, -(CUBE_FRAME.windowPlaneHeight / 2) + 0.5, 0]}
        rotation-x={CUBE_FRAME.quarterRotation}
      >
        <planeGeometry
          args={[
            CUBE_FRAME.windowPlaneWidth - CUBE_FRAME.windowSubtraction,
            CUBE_FRAME.windowPlaneHeight - CUBE_FRAME.windowSubtraction,
          ]}
        />
        <meshPhongMaterial
          shininess={100}
          specular="#909090"
          color={debugControls.screenColor}
          opacity={0.05}
          transparent
          visible={true}
          wireframe={false}
          depthTest={false}
        />
      </mesh>

      {windowPlane(
        true,
        [CUBE_FRAME.windowPlaneWidth, CUBE_FRAME.windowPlaneHeight],
        [0, -(CUBE_FRAME.windowPlaneHeight / 2) + 0.5, 0],
        CUBE_FRAME.quarterRotation,
        0,
      )}
      {windowPlane(
        true,
        [CUBE_FRAME.windowPlaneWidth, CUBE_FRAME.windowPlaneHeight],
        [0, CUBE_FRAME.windowPlaneHeight / 2 + 0.5, 0],
        CUBE_FRAME.quarterRotation,
        0,
      )}

      {/* Front and back */}
      {windowPlane(
        true,
        [CUBE_FRAME.windowPlaneWidth, CUBE_FRAME.windowPlaneHeight],
        [0, 0.5, CUBE_FRAME.windowPlaneHeight / 2],
        0,
        0,
      )}
      {windowPlane(
        true,
        [CUBE_FRAME.windowPlaneWidth, CUBE_FRAME.windowPlaneHeight],
        [0, 0.5, -CUBE_FRAME.windowPlaneHeight / 2],
        0,
        0,
      )}

      {/* Sides */}
      {windowPlane(
        true,
        [CUBE_FRAME.windowPlaneHeight, CUBE_FRAME.windowPlaneHeight],
        [CUBE_FRAME.windowPlaneWidth / 2, 0.5, 0],
        0,
        CUBE_FRAME.quarterRotation,
      )}
      {windowPlane(
        true,
        [CUBE_FRAME.windowPlaneHeight, CUBE_FRAME.windowPlaneHeight],
        [-CUBE_FRAME.windowPlaneWidth / 2, 0.5, 0],
        0,
        CUBE_FRAME.quarterRotation,
      )}

      {/* Outer cube box */}
      {/* Top and bottom */}
      {windowPlane(
        false,
        [
          CUBE_FRAME.windowPlaneWidth + CUBE_FRAME.outerCubePlus,
          CUBE_FRAME.windowPlaneHeight + CUBE_FRAME.outerCubePlus,
        ],
        [
          0,
          -((CUBE_FRAME.windowPlaneHeight + CUBE_FRAME.outerCubePlus) / 2) +
            0.5,
          0,
        ],
        CUBE_FRAME.quarterRotation,
        0,
      )}
      {windowPlane(
        false,
        [
          CUBE_FRAME.windowPlaneWidth + CUBE_FRAME.outerCubePlus,
          CUBE_FRAME.windowPlaneHeight + CUBE_FRAME.outerCubePlus,
        ],
        [
          0,
          (CUBE_FRAME.windowPlaneHeight + CUBE_FRAME.outerCubePlus) / 2 + 0.5,
          0,
        ],
        CUBE_FRAME.quarterRotation,
        0,
      )}

      {/* Front and back */}
      {windowPlane(
        false,
        [
          CUBE_FRAME.windowPlaneWidth + CUBE_FRAME.outerCubePlus,
          CUBE_FRAME.windowPlaneHeight + CUBE_FRAME.outerCubePlus,
        ],
        [0, 0.5, (CUBE_FRAME.windowPlaneHeight + CUBE_FRAME.outerCubePlus) / 2],
        0,
        0,
      )}
      {windowPlane(
        false,
        [
          CUBE_FRAME.windowPlaneWidth + CUBE_FRAME.outerCubePlus,
          CUBE_FRAME.windowPlaneHeight + CUBE_FRAME.outerCubePlus,
        ],
        [
          0,
          0.5,
          -(CUBE_FRAME.windowPlaneHeight + CUBE_FRAME.outerCubePlus) / 2,
        ],
        0,
        0,
      )}

      {/* Sides */}
      {windowPlane(
        false,
        [
          CUBE_FRAME.windowPlaneHeight + CUBE_FRAME.outerCubePlus,
          CUBE_FRAME.windowPlaneHeight + CUBE_FRAME.outerCubePlus,
        ],
        [(CUBE_FRAME.windowPlaneWidth + CUBE_FRAME.outerCubePlus) / 2, 0.5, 0],
        0,
        CUBE_FRAME.quarterRotation,
      )}
      {windowPlane(
        false,
        [
          CUBE_FRAME.windowPlaneHeight + CUBE_FRAME.outerCubePlus,
          CUBE_FRAME.windowPlaneHeight + CUBE_FRAME.outerCubePlus,
        ],
        [-(CUBE_FRAME.windowPlaneWidth + CUBE_FRAME.outerCubePlus) / 2, 0.5, 0],
        0,
        CUBE_FRAME.quarterRotation,
      )}
    </>
  );
}
