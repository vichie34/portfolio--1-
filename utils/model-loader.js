import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export function loadModel(url) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader()

        loader.load(
            url,
            (gltf) => {
                resolve(gltf)
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
            },
            (error) => {
                console.error("Error loading model:", error)
                reject(error)
            },
        )
    })
}
