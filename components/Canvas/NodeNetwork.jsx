"use client";

import { useRef, useMemo, useLayoutEffect } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NodeNetwork({ formInteracted, setFormInteracted, isMobile }) {
  const gsapRef = useRef();
  const floatRef = useRef();
  const meshRef = useRef();
  const materialRef = useRef();
  const { camera } = useThree();
  
  // Load the logo texture
  const logoTexture = useLoader(THREE.TextureLoader, '/logo.png');

  // Reduce instances on mobile for extreme performance gain
  const particleCount = isMobile ? 1200 : 4000;
  
  const { positions, randomRotations, spinSpeeds } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const rot = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 * Math.pow(Math.random(), 1/3); 
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      rot[i * 3] = Math.random() * Math.PI * 2;
      rot[i * 3 + 1] = Math.random() * Math.PI * 2;
      rot[i * 3 + 2] = Math.random() * Math.PI * 2;
      
      speeds[i * 3] = (Math.random() - 0.5) * 0.05;
      speeds[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      speeds[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }
    return { positions: pos, randomRotations: rot, spinSpeeds: speeds };
  }, [particleCount]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Set initial positions and handle continuous floating/spinning
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollProgress = document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight);
    
    // Float the entire group
    if (scrollProgress < 0.9 && floatRef.current) {
      floatRef.current.position.y = Math.sin(time * 0.5) * 0.1;
      floatRef.current.rotation.y += 0.002;
      floatRef.current.rotation.x += 0.001;

      // Mouse parallax with damping
      if (!isMobile) {
        const targetX = (state.pointer.x * Math.PI) / 8;
        const targetY = (state.pointer.y * Math.PI) / 8;
        floatRef.current.rotation.y += 0.05 * (targetX - floatRef.current.rotation.y);
        floatRef.current.rotation.x += 0.05 * (targetY - floatRef.current.rotation.x);
      }
    }

    // Spin individual logos
    if (meshRef.current) {
      for (let i = 0; i < particleCount; i++) {
        dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        
        // Update rotation based on spin speed
        randomRotations[i * 3] += spinSpeeds[i * 3];
        randomRotations[i * 3 + 1] += spinSpeeds[i * 3 + 1];
        randomRotations[i * 3 + 2] += spinSpeeds[i * 3 + 2];
        
        dummy.rotation.set(randomRotations[i * 3], randomRotations[i * 3 + 1], randomRotations[i * 3 + 2]);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  // Handle dissolve when form is interacted
  useLayoutEffect(() => {
    if (materialRef.current) {
      if (formInteracted) {
        gsap.to(materialRef.current, { opacity: 0, duration: 1, ease: "power2.inOut" });
        gsap.to(gsapRef.current.scale, { x: 40, y: 40, z: 40, duration: 1.5, ease: "power3.in" });
      } else {
        gsap.to(materialRef.current, { opacity: 0.8, duration: 1, ease: "power2.inOut" });
      }
    }
  }, [formInteracted]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            // Re-appear if scrolling back up
            if (self.progress < 0.8 && formInteracted) {
              setFormInteracted(false);
            }
          }
        }
      });

      // Buttery smooth single continuous zoom and spin
      tl.to(gsapRef.current.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        z: Math.PI,
        ease: "none",
        duration: 1
      }, 0);

      // First part: Move to the left space (About section)
      tl.to(gsapRef.current.position, {
        x: -3.5,
        z: 3, 
        y: 0,
        ease: "power1.inOut",
        duration: 0.4
      }, 0);

      // Second part: Move to center bottom (Contact section)
      tl.to(gsapRef.current.position, {
        x: 0,
        z: 7.5, // Extreme close up at bottom
        y: -1,
        ease: "power1.inOut",
        duration: 0.6
      }, 0.4);

      tl.to(gsapRef.current.scale, {
        x: 15,
        y: 15,
        z: 15,
        ease: "power2.in",
        duration: 1
      }, 0);
      
      // Force ScrollTrigger to recalculate metrics during the initial load sequence
      // This ensures it adapts perfectly when the loading screen unmounts and the page height expands
      const refreshInterval = setInterval(() => ScrollTrigger.refresh(), 500);
      setTimeout(() => clearInterval(refreshInterval), 3000);
    });

    return () => ctx.revert();
  }, [camera, formInteracted, setFormInteracted]);

  return (
    <group ref={gsapRef} position={[2.5, -0.5, 0]}>
      <ambientLight intensity={1} />
      
      <group ref={floatRef}>
        <instancedMesh ref={meshRef} args={[null, null, particleCount]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial 
            ref={materialRef}
            map={logoTexture}
            transparent={true}
            opacity={0.8}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </instancedMesh>
      </group>
    </group>
  );
}
