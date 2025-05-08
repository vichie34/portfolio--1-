import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function GradientSphere() {
    const sphereRef = useRef<THREE.Mesh>(null);
    const [color, setColor] = useState(new THREE.Color(1, 1, 1)); // Initial color

    // Rotate the sphere smoothly and cycle through colors
    useFrame(({ clock }) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.y += 0.01; // Rotate on the Y-axis
            sphereRef.current.rotation.x += 0.005; // Slight rotation on the X-axis
        }

        const time = clock.getElapsedTime();
        const r = (Math.sin(time) + 1) / 2; // Red channel oscillates between 0 and 1
        const g = (Math.sin(time + Math.PI / 2) + 1) / 2; // Green channel offset by 90 degrees
        const b = (Math.sin(time + Math.PI) + 1) / 2; // Blue channel offset by 180 degrees
        setColor(new THREE.Color(r, g, b)); // Update the color state
    });

    return (
        <Sphere ref={sphereRef} args={[1.5, 64, 64]}>
            <MeshDistortMaterial
                attach="material"
                color={color} // Pass the dynamic color as a prop
                distort={0.4} // Distortion intensity
                speed={2} // Animation speed
                roughness={0.5}
            />
        </Sphere>
    );
}