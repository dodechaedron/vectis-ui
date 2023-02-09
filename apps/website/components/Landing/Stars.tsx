import React, { createRef, useState } from 'react';
import { inSphere } from 'maath/random';
import { BufferGeometry, Material, Points as TPoints } from 'three';

import { SpringValue } from '@react-spring/core';
import { PointMaterial, Points } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

interface Props {
  color: SpringValue<string> | string;
}

const Stars: React.FC<Props> = ({ color, ...props }) => {
  const pointsRef = createRef<TPoints<BufferGeometry, Material | Material[]>>();
  const [sphere] = useState(() => inSphere(new Float32Array(1000), { radius: 1.5 }));

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.x -= delta / 10;
    pointsRef.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={sphere as Float32Array} stride={3} frustumCulled={false}>
        <PointMaterial transparent color={color} size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
};

export default Stars;
