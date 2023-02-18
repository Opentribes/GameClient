import DebugHelper from "./DebugHelper";
import {Object3D} from "three";
import * as THREE from 'three';
import {JsonCenterLocation} from "../types/JsonMapData";

export default class LocationHelper implements DebugHelper {
    private readonly element: Object3D

    constructor() {
        const material = new THREE.MeshBasicMaterial({color: 0xff00ff});
        this.element = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0, 0.5), material);
        this.element.name = 'helper';

        this.element.addEventListener('update', (event) => {
            const location = JSON.parse(event.message);
            this.update(location);
        })

    }

    getElement() {
        return this.element;
    }

    update(location: JsonCenterLocation): void {
        this.element.position.set(location.x, 0.1, location.y);
    }

}