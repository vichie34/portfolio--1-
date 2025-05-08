// "use client"

// import { useState, Suspense } from "react"
// import { Canvas } from "@react-three/fiber"
// import { useGLTF, OrbitControls, Environment } from "@react-three/drei"



// import duckModelUrl from '/assets/3d/duck.glb'; // make sure your build system supports importing file URLs

// // Then use duckModelUrl as the source to your loader
// loader.load(duckModelUrl, (gltf) => {
//     scene.add(gltf.scene);
// });

// function Model() {
//     const { scene } = useGLTF("/assets/3d/duck.glb", undefined, (error) => {
//         console.error("Error loading GLTF model:", error);
//     });
//     return <primitive object={scene} />
// }

// export default function ModelViewer() {
//     const [error, setError] = useState(null)

//     return (
//         <div className="w-full h-[500px] relative">
//             {error ? (
//                 <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-red-500 p-4">
//                     <p>Error loading model: {error}</p>
//                 </div>
//             ) : (
//                 <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
//                     <ambientLight intensity={0.5} />
//                     <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//                     <Suspense fallback={<LoadingFallback />}>
//                         <Model />
//                         <Environment preset="city" />
//                     </Suspense>
//                     <OrbitControls />
//                 </Canvas>
//             )}
//         </div>
//     )
// }

// function LoadingFallback() {
//     return (
//         <mesh>
//             <boxGeometry args={[1, 1, 1]} />
//             <meshStandardMaterial color="hotpink" />
//         </mesh>
//     )
// }
