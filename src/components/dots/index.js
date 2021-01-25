import { useRef, useMemo } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

import { roundedSquareWave } from "../../utils";

export default function Dots() {
  const ref = useRef();
  const { vec, transform, positions, distance } = useMemo(() => {
    const vec = new THREE.Vector3();
    const transform = new THREE.Matrix4();

    const positions = [...Array(10000)].map((_, i) => {
      const position = new THREE.Vector3();

      position.x = (i % 100) - 50;
      position.y = Math.floor(i / 100) - 50;

      position.y += (i % 2) * 0.5;

      position.x += Math.random() * 0.3;
      position.y += Math.random() * 0.3;

      return position;
    });

    const right = new THREE.Vector3(1, 0, 0);

    const distance = positions.map((pos) => {
      return pos.length() + Math.cos(pos.angleTo(right) * 8) * 0.5;
    });

    return { vec, transform, positions, distance };
  }, []);

  useFrame(({ clock }) => {
    for (let i = 0; i < 10000; i++) {
      const dist = distance[i];
      const t = clock.elapsedTime - dist / 25;
      const wave = roundedSquareWave(t, 0.15 + (0.2 * dist) / 72, 0.4, 1 / 3.8);

      vec.copy(positions[i]).multiplyScalar(wave + 1.3);
      transform.setPosition(vec);
      ref.current.setMatrixAt(i, transform);
    }

    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[null, null, 10000]}>
      <circleBufferGeometry args={[0.15]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
}
