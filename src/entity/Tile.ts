import {Object3D} from "three";

export default interface Tile {
    id: string;
    name: string;
    path: string;
    object?: Object3D;
};