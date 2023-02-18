import {Object3D} from "three";
import {JsonCenterLocation} from "../types/JsonMapData";

export default interface DebugHelper {
    getElement(): Object3D

    update(location: JsonCenterLocation): void
}