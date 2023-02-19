import {Scene} from "three/src/Three";
import {JsonCenterLocation, JsonMapData} from "./types/JsonMapData";
import TileRepository from "./repository/TileRepository";
import * as THREE from 'three';

export default class GameMap {
    tileRepository: TileRepository;
    scene: Scene;

    constructor(tileRepository: TileRepository, scene: Scene) {
        this.scene = scene;
        this.tileRepository = tileRepository;
    }


    drawTiles(data: JsonMapData) {
        const tempObject = new THREE.Object3D();
        const viewport = data.viewport;
        data.layers.background.forEach((tileJson) => {
                try {

                    const mesh = this.scene.getObjectByName(tileJson.data.toString());
                    if (!(mesh instanceof THREE.InstancedMesh)) {
                        return;
                    }
                    const normalizedLocation = {
                        x: tileJson.location.x - (viewport.center.x - ~~(viewport.width / 2)),
                        y: tileJson.location.y - (viewport.center.y - ~~(viewport.height / 2))
                    }

                    tempObject.scale.set(0.5, 0.5, 0.5);
                    tempObject.position.set(tileJson.location.x, 0, tileJson.location.y);
                    tempObject.matrixAutoUpdate = false;
                    tempObject.updateMatrix()

                    const index = (normalizedLocation.y + 1) * viewport.width + normalizedLocation.x

                    mesh.setMatrixAt(index, tempObject.matrix)
                    mesh.instanceMatrix.needsUpdate = true;
                } catch (error) {
                    return;
                }
            }
        )


    }

    async updateTiles(mapData: JsonMapData) {
        const headers = new Headers();
        headers.append('X-Requested-With', 'XMLHttpRequest');

        const response = await fetch(`/map/${mapData.viewport.center.x}/${mapData.viewport.center.y}`, {headers: headers})
        const data = await response.json()
        this.drawTiles(data.map);
    }
}