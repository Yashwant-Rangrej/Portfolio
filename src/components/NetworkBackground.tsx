import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const particleCount = 100;
  const maxDistance = 2.5;

  // Generate random particle positions
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = [];
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      vel.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }
    return { positions: pos, velocities: vel };
  }, [particleCount]);

  // Array to hold line positions
  const linePositions = useMemo(() => new Float32Array(particleCount * particleCount * 3), [particleCount]);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const positionsAttr = pointsRef.current.geometry.attributes.position;
    let lineIndex = 0;

    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      positionsAttr.array[i * 3] += velocities[i].x;
      positionsAttr.array[i * 3 + 1] += velocities[i].y;
      positionsAttr.array[i * 3 + 2] += velocities[i].z;

      // Bounce off invisible walls
      if (Math.abs(positionsAttr.array[i * 3]) > 7.5) velocities[i].x *= -1;
      if (Math.abs(positionsAttr.array[i * 3 + 1]) > 7.5) velocities[i].y *= -1;
      if (Math.abs(positionsAttr.array[i * 3 + 2]) > 7.5) velocities[i].z *= -1;
    }
    positionsAttr.needsUpdate = true;

    // Update lines between close particles
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positionsAttr.array[i * 3] - positionsAttr.array[j * 3];
        const dy = positionsAttr.array[i * 3 + 1] - positionsAttr.array[j * 3 + 1];
        const dz = positionsAttr.array[i * 3 + 2] - positionsAttr.array[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          linePositions[lineIndex++] = positionsAttr.array[i * 3];
          linePositions[lineIndex++] = positionsAttr.array[i * 3 + 1];
          linePositions[lineIndex++] = positionsAttr.array[i * 3 + 2];

          linePositions[lineIndex++] = positionsAttr.array[j * 3];
          linePositions[lineIndex++] = positionsAttr.array[j * 3 + 1];
          linePositions[lineIndex++] = positionsAttr.array[j * 3 + 2];
        }
      }
    }

    const linesAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    linesAttr.set(linePositions);
    linesRef.current.geometry.setDrawRange(0, lineIndex / 3);
    linesAttr.needsUpdate = true;
    
    // Slow rotation
    pointsRef.current.rotation.y += 0.001;
    linesRef.current.rotation.y += 0.001;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#E2E8F0" size={0.05} transparent opacity={0.8} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
};

export const NetworkBackground: React.FC = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: 'transparent' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <fog attach="fog" args={['#0A0A0A', 2, 10]} />
        <ParticleNetwork />
      </Canvas>
    </div>
  );
};
