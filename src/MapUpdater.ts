import * as THREE from 'three';
import {JsonCenterLocation} from "./types/JsonMapData";

export default class MapUpdater {
    private readonly box: THREE.Box3
    private readonly size: THREE.Vector3;

    constructor(centerLocation: JsonCenterLocation, updateBoxWidth: number = 30, updateBoxDepth: number = 20, updateBoxHeight: number = 6) {
        this.box = new THREE.Box3();
        this.size = new THREE.Vector3(updateBoxWidth, updateBoxHeight, updateBoxDepth);
        const center = new THREE.Vector3(centerLocation.x, 0, centerLocation.y);
        this.box.setFromCenterAndSize(center, this.size);
    }

    getBox(): THREE.Box3 {
        return this.box
    }

    getSize(): THREE.Vector3 {
        return this.size
    }
}