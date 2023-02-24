import Tile from "../entity/Tile";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';

export default class TileRepository {

    tileList: Map<number, Tile>;
    loader: GLTFLoader;

    constructor(tiles: Array<Tile>, loader: GLTFLoader) {

        this.loader = loader;
        const tileList = new Map();
        tiles.forEach(function (tile) {
            tileList.set(tile.id, tile)
        });
        this.tileList = tileList;
    }


    async loadTiles(scene: THREE.Scene, buffer: number): Promise<Map<number, Tile>> {


        for (const tile of this.tileList.values()) {
            const data = await this.loader.loadAsync(`${tile.path}?version=122`);

            const mesh = data.scene.children.at(0);

            if (!(mesh instanceof THREE.Mesh)) {
                throw new Error('First child in Blender object ist not a mesh')
            }

            const tileInstance = new THREE.InstancedMesh(mesh.geometry,mesh.material, buffer);
            tileInstance.name = tile.id.toString();
            tileInstance.uuid = tile.id.toString();
            tileInstance.position.set(0,0,0);

            tileInstance.matrixAutoUpdate = false;
            tileInstance.instanceMatrix.needsUpdate = true;
            scene.add(tileInstance);

        }

        return this.tileList;
    }

    getByName(tileName: number): Tile {
        const tile = this.tileList.get(tileName);
        if (tile === undefined) {
            throw new Error(`tile ${tileName} not exists`);
        }
        return tile;
    }
}