import DebugHelper from "./DebugHelper";
import {JsonCenterLocation} from "../types/JsonMapData";
import {Object3D} from "three";
import * as THREE from 'three';

export default class UpdateBoxHelper implements DebugHelper {

    private readonly element: Object3D

    constructor(updateBox: THREE.Box3) {

        this.element = new THREE.Box3Helper(updateBox, new THREE.Color(0xff0000));
        this.element.name = 'helper';

        this.element.addEventListener('update', (event) => {
            const location = JSON.parse(event.message);
            this.update(location);
        })
    }

    getElement(): Object3D {
        return this.element;
    }

    update(location: JsonCenterLocation): void {

    }

}