'use client'

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Group } from 'three';
import { motion } from 'motion/react';

function NotebookModel() {
  const { scene } = useGLTF('/notebook3D.glb');
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotação suave do notebook
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.04;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={[0.3, 0.3, 0.3]}>
      <primitive object={scene} />
    </group>
  );
}

export default function Notebook3D() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      viewport={{ once: true }}
      className="w-full h-96 lg:h-[500px] overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        <NotebookModel />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </motion.div>
  );
}
