import * as THREE from 'three'

export function getMesh(object: THREE.Object3D): THREE.Mesh {
    for (const mesh of object.children) {
        if (mesh instanceof THREE.Mesh) {
            return mesh;
        }
    }
    throw new Error(`Object ${object.name} does not have mesh children`)
}


export interface Tile {
    id: number
    name: string
    path: string
    mesh: THREE.Mesh
}
