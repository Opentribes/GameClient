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


    async getTileList() {
        let promises:Array<PromisedTile> = [];

        this.tileList.forEach( tile => {
            promises.push({
                id: tile.id,
                promise: this.loader.loadAsync(tile.path)
            });
        });


        const tileData = await Promise.all(promises.map(({promise}) => promise));

        tileData.forEach((data, index) => {
            let currentTileIndex = promises[index].id;
            let currentTile = this.tileList.get(currentTileIndex);

            let object = data.scene;
            object.parent = null;
            object.name = currentTileIndex;
            object.scale.set(0.5,0.5,0.5);
         
            currentTile.object = object;

            this.tileList.set(currentTileIndex, currentTile);
        });

        return this.tileList;
    }
}