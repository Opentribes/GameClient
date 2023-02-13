import {Object3D} from "three";

export interface PromisedTile {
    id: number;
    promise: Promise<any>
}

export interface JsonMapTileLocation {
    x: number;
    y: number;
}

export interface JsonMapTile {
    id: string;
    data: number;
    location: JsonMapTileLocation
}

export interface JsonMapData {
   [layers:string]: Array<JsonMapTile>
}

export default interface Tile {
    id: string;
    name: string;
    path: string;
    object?: Object3D;
};