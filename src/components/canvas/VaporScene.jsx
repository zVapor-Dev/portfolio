import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

const VaporParticles = () => {
  const ref = useRef();
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(3000), { radius: 1.8 }),
    []
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 12;
      ref.current.rotation.y -= delta / 18;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00e5ff"
          size={0.004}
          sizeAttenuation
          depthWrite={false}
          opacity={0.65}
        />
      </Points>
    </group>
  );
};

const VaporRing = () => {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.15;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.2, 0.008, 16, 100]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.35} />
    </mesh>
  );
};

const VaporSceneCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 2]} intensity={0.6} color="#00e5ff" />
      <pointLight position={[-2, -1, 1]} intensity={0.4} color="#a855f7" />
      <VaporParticles />
      <VaporRing />
    </Canvas>
  );
};

export default VaporSceneCanvas;
