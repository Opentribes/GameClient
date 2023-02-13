import {Tile, PromisedTile} from "../entity/Tile";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

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


    async getTileList(): Promise<Map<number, Tile>> {

        for (const tile of this.tileList.values()) {
            const data = await this.loader.loadAsync(tile.path);
            let object = data.scene;

            object.parent = null;
            object.name = tile.id;
            object.scale.set(0.5, 0.5, 0.5);

            tile.object = object;

            this.tileList.set(tile.id, tile);
        }

        return this.tileList;
    }
}