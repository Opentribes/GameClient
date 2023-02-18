import {Scene} from "three/src/Three";
import {JsonCenterLocation, JsonMapData} from "./types/JsonMapData";
import TileRepository from "./repository/TileRepository";

export default class GameMap {
    tileRepository: TileRepository;
    scene: Scene;
    private isLoading: boolean = false

    constructor(tileRepository: TileRepository, scene: Scene) {
        this.scene = scene;
        this.tileRepository = tileRepository;
    }


    drawTiles(data: JsonMapData) {

        data.layers.background.forEach((tileJson) => {
                try {
                    const currentTile = this.tileRepository.getByName(tileJson.data);

                    const tile = this.scene.getObjectByName(tileJson.id);
                    if (tile !== undefined) {
                        return;
                    }

                    const mesh = currentTile.object;
                    if (mesh === undefined) {
                        throw new Error(`mesh data for tile ${tileJson.id} was not loaded`);
                    }

                    const clonedData = mesh.clone(true);

                    clonedData.position.set(tileJson.location.x, 0, tileJson.location.y);
                    this.scene.add(clonedData);
                } catch (error) {
                    return;
                }
            }
        )


    }

    async updateTiles(centerLocation: JsonCenterLocation, mapSize: THREE.Vector3) {
        if (this.isLoading) {
            return;
        }
        this.isLoading = true

        const headers = new Headers();
        headers.append('X-Requested-With', 'XMLHttpRequest');

        const response = await fetch(`/map/${centerLocation.x}/${centerLocation.y}?viewportHeight=${mapSize.z}&viewportWidth=${mapSize.x}`, {headers: headers})
        const data = await response.json()
        this.drawTiles(data.map);
        this.isLoading = false
    }
}