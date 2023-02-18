import {Scene} from "three/src/Three";
import {JsonMapData} from "./types/JsonMapData";
import TileRepository from "./repository/TileRepository";

export default class GameMap {
    tileRepository: TileRepository;
    scene: Scene;

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
}