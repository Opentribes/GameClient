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
        const scope = this;
        this.tileList.forEach(function (tile) {
            promises.push({
                id: tile.id,
                promise: scope.loader.loadAsync(tile.path)
            });
        });


        const tileData = await Promise.all(promises.map(({promise}) => promise));

        tileData.forEach((data, index) => {
            let currentTileIndex = promises[index].id;
            let currentTile = scope.tileList.get(currentTileIndex);
            data.scene.parent = null;
            let object = data.scene;
            object.name = currentTileIndex;
            object.scale.set(0.5,0.5,0.5);
         
            currentTile.object = object;
            scope.tileList.set(currentTileIndex, currentTile);
        });

        return this.tileList;
    }
}