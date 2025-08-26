'use client';

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

const getElectronShells = (atomicNumber: number): number[] => {
  const shells: number[] = [];
  let remainingElectrons = atomicNumber;

  const shellCapacities = [2, 8, 18, 32, 32, 18, 8];

  for (const capacity of shellCapacities) {
    if (remainingElectrons > 0) {
      const electronsInShell = Math.min(remainingElectrons, capacity);
      shells.push(electronsInShell);
      remainingElectrons -= electronsInShell;
    } else {
      break;
    }
  }

  return shells;
};

const Electron = ({ radius, speed }: { radius: number; speed: number }) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.x = radius * Math.cos(t);
    ref.current.position.z = radius * Math.sin(t);
  });

  return (
    <Sphere ref={ref} args={[0.2, 16, 16]}>
      <meshStandardMaterial color="#3498db" emissive="#3498db" emissiveIntensity={2} />
    </Sphere>
  );
};

const ElectronShell = ({ shellIndex, electronCount }: { shellIndex: number; electronCount: number }) => {
  const radius = (shellIndex + 1) * 2;
  const electrons = useMemo(() => {
    return Array.from({ length: electronCount }).map((_, i) => {
      const angle = (i / electronCount) * Math.PI * 2;
      return {
        initialAngle: angle,
        speed: 0.5 / (shellIndex + 1),
      };
    });
  }, [electronCount, shellIndex]);

  const orbitRef = useRef<THREE.LineLoop>(null!);

  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i <= 360; i += 5) {
      p.push(new THREE.Vector3(radius * Math.cos(THREE.MathUtils.degToRad(i)), 0, radius * Math.sin(THREE.MathUtils.degToRad(i))));
    }
    return p;
  }, [radius]);

  return (
    <group>
      <lineLoop ref={orbitRef} points={points}>
         <lineBasicMaterial color="gray" transparent opacity={0.3} />
      </lineLoop>
      {electrons.map(({ speed }, i) => (
        <Electron key={i} radius={radius} speed={speed} />
      ))}
    </group>
  );
};

interface AtomModelProps {
  atomicNumber: number;
}

const AtomModel: React.FC<AtomModelProps> = ({ atomicNumber }) => {
  const shells = useMemo(() => getElectronShells(atomicNumber), [atomicNumber]);

  return (
    <Canvas camera={{ position: [0, 20, 20], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <group>
        <Sphere args={[1, 32, 32]}>
          <meshStandardMaterial color="#e74c3c" emissive="#c0392b" emissiveIntensity={1} />
        </Sphere>
        {shells.map((electronCount, i) => (
          <ElectronShell key={i} shellIndex={i} electronCount={electronCount} />
        ))}
      </group>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

export default AtomModel;
