import React, { createRef, Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';

import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/three';
import { ContactShadows, Environment, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import { AmbientLightProps, useFrame, PointLightProps } from '@react-three/fiber';
import { AnimatedComponent } from '@react-spring/web';

const AnimatedMaterial = a(MeshDistortMaterial) as unknown as AnimatedComponent<typeof MeshDistortMaterial>;
const AmbientLight = a.ambientLight as React.FC<Pick<AmbientLightProps, 'intensity'>>;
const PointLight = a.pointLight as React.FC<Pick<PointLightProps, 'intensity' | 'color' | 'ref' | 'position'>>;

interface Props {
  setBg: ({ background, fill }: { background: string, fill: string }) => void;
  setCursor: (c: string) => void;
}

export const Scene: React.FC<Props> = ({ setBg, setCursor }) => {
  const sphere = createRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>();
  const light = createRef<THREE.PointLight>();
  const [mode, setMode] = useState(false);
  const [down, setDown] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setCursor(hovered ? 'cursor-none' : 'cursor-round');
  }, [hovered]);

  useFrame((state) => {
    if (!light?.current?.position || sphere?.current?.position) return;
    light.current.position.x = state.mouse.x * 20;
    light.current.position.y = state.mouse.y * 20;
    if (sphere.current) {
      sphere.current.position.x = THREE.MathUtils.lerp(sphere.current.position.x, hovered ? state.mouse.x / 2 : 0, 0.2);
      sphere.current.position.y = THREE.MathUtils.lerp(
        sphere.current.position.y,
        Math.sin(state.clock.elapsedTime / 1.5) / 6 + (hovered ? state.mouse.y / 2 : 0),
        0.2
      );
    }
  });

  const [{ wobble, coat, color, ambient, env }] = useSpring<any>(
    {
      wobble: down ? 1.2 : hovered ? 1.05 : 1,
      coat: mode && !hovered ? 0.04 : 1,
      ambient: mode && !hovered ? 1.5 : 0.5,
      env: mode && !hovered ? 0.4 : 1,
      color: hovered ? '#566fa1' : mode ? '#202020' : 'white',
      config: (n: string) => n === 'wobble' && hovered && { mass: 2, tension: 1000, friction: 10 }
    },
    [mode, hovered, down]
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={75}>

      </PerspectiveCamera>
      <AmbientLight intensity={ambient} />
      <PointLight ref={light} position={[0, 0, -15]} intensity={env} color="#566fa1" />
      <Suspense fallback={null}>
        <a.mesh
          ref={sphere}
          scale={wobble}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onPointerDown={() => setDown(true)}
          onClick={() => {
            setDown(false);
            setMode(!mode);
            setBg({ background: !mode ? '#202020' : '#f0f0f0', fill: !mode ? '#f0f0f0' : '#202020' });
          }}
        >
          <sphereBufferGeometry args={[1, 64, 64]} />
          <AnimatedMaterial color={color} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0} metalness={0.1} />
        </a.mesh>
        <Environment preset="warehouse" />
        <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -1.5, 0]}
          opacity={mode ? 0.8 : 0.4}
          width={15}
          height={15}
          blur={2.5}
          far={1.6}
        />
      </Suspense>
    </>
  );
}
