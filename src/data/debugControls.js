import { useControls } from "leva";

export default function debugControls() {
  const { position } = useControls("position", {
    position: {
      value: { x: 0, y: -0.1, z: -0.9 },
      step: 0.01,
    },
  });

  const { smallestSpin, smallSpin } = useControls("spin", {
    smallestSpin: {
      value: 0.5,
      step: 0.01,
      min: 0,
      max: 4,
    },
    smallSpin: {
      value: 1.0,
      step: 0.01,
      min: 0,
      max: 4,
    },
  });

  const { smallestScale, smallScale } = useControls("scale", {
    smallestScale: {
      value: 1.77,
      step: 0.01,
      min: 0,
      max: 10,
    },
    smallScale: {
      value: 1.6,
      step: 0.01,
      min: 0,
      max: 10,
    },
  });

  const { smallestColor, smallColor } = useControls("color", {
    smallestColor: "#696565",
    smallColor: "#dbd9be",
  });

  const { smallestDistortion, smallDistortion } = useControls("distortion", {
    smallestDistortion: {
      value: 0.56,
      step: 0.01,
      min: 0,
      max: 2,
    },
    smallDistortion: {
      value: 0.25,
      step: 0.01,
      min: 0,
      max: 2,
    },
  });

  const { smallestSpeed, smallSpeed } = useControls("speed", {
    smallestSpeed: {
      value: 0.88,
      step: 0.01,
      min: 0,
      max: 3,
    },
    smallSpeed: {
      value: 0.5,
      step: 0.01,
      min: 0,
      max: 3,
    },
  });

  const { outerSpheresOpacity, centralSphereOpacity } = useControls("opacity", {
    outerSpheresOpacity: {
      value: 0.12,
      step: 0.01,
      min: 0,
      max: 1,
    },
    centralSphereOpacity: {
      value: 1.0,
      step: 0.01,
      min: 0,
      max: 1,
    },
  });

  const { visible, wireframe } = useControls("visibility", {
    visible: true,
    wireframe: true,
  });

  const { floatSpeed, floatIntensity } = useControls("float", {
    floatSpeed: {
      value: 1.25,
      step: 0.01,
      min: 0,
      max: 20,
    },
    floatIntensity: {
      value: 14.3,
      step: 0.01,
      min: 0,
      max: 20,
    },
  });

  const { innerFrame, outerFrame } = useControls("cubeFrame", {
    innerFrame: "#cecece",
    outerFrame: "#a5bea5",
  });

  const { screenOpacity, screenColor } = useControls("screens", {
    screenOpacity: {
      value: 0.75,
      step: 0.01,
      min: 0,
      max: 1,
    },
    screenColor: "#ffffff",
  });

  const { textColor } = useControls("text", {
    textColor: "#3a3a3b",
  });

  const { perfVisible } = useControls("performance", {
    perfVisible: false,
  });

  const controls = {
    position: position,
    smallestSpin: smallestSpin,
    smallSpin: smallSpin,
    smallestScale: smallestScale,
    smallScale: smallScale,
    smallestColor: smallestColor,
    smallColor: smallColor,
    smallestDistortion: smallestDistortion,
    smallDistortion: smallDistortion,
    smallestSpeed: smallestSpeed,
    smallSpeed: smallSpeed,
    visible: visible,
    wireframe: wireframe,
    floatSpeed: floatSpeed,
    floatIntensity: floatIntensity,
    innerFrame: innerFrame,
    outerFrame: outerFrame,
    outerSpheresOpacity,
    centralSphereOpacity: centralSphereOpacity,
    screenOpacity: screenOpacity,
    screenColor: screenColor,
    textColor: textColor,
    perfVisible: perfVisible,
  };
  return controls;
}
