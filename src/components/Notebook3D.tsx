'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { Group } from 'three'
import { motion } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

function NotebookModel({ animate }: { animate: boolean }) {
  const { scene } = useGLTF('/notebook3D.glb', true)
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (!animate || !groupRef.current) return
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.04
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.04
  })

  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={[0.3, 0.3, 0.3]}>
      <primitive object={scene} />
    </group>
  )
}

function VisibilityPause({ enabled }: { enabled: boolean }) {
  const { invalidate, gl } = useThree()
  const container = gl.domElement

  useEffect(() => {
    if (!enabled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) invalidate()
      },
      { threshold: 0.1 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [enabled, invalidate, container])

  return null
}

useGLTF.preload('/notebook3D.glb', true)

export default function Notebook3D() {
  const isMobile = useIsMobile()
  const reduceMotion = usePrefersReducedMotion()
  const [inView, setInView] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '80px', threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const shouldAnimate = !reduceMotion && !isMobile && inView

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.5 }}
      viewport={{ once: true }}
      className="w-full h-72 sm:h-96 lg:h-[500px] overflow-hidden"
    >
      {inView && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={isMobile ? 1 : [1, 1.5]}
          frameloop={shouldAnimate ? 'always' : 'demand'}
          performance={{ min: 0.5 }}
          gl={{
            antialias: !isMobile,
            powerPreference: 'high-performance',
            alpha: true,
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          {!isMobile && (
            <spotLight
              position={[0, 8, 2]}
              angle={0.6}
              penumbra={0.5}
              intensity={2}
              distance={20}
            />
          )}

          <NotebookModel animate={shouldAnimate} />
          <VisibilityPause enabled={!shouldAnimate} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={!isMobile}
            autoRotate={shouldAnimate}
            autoRotateSpeed={0.8}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      )}
    </motion.div>
  )
}
