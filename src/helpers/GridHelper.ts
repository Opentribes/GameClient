import {Object3D} from "three";
import {JsonCenterLocation} from "../types/JsonMapData";
import * as THREE from 'three';
import DebugHelper from "./DebugHelper";

export default class GridHelper implements DebugHelper {

    private readonly element: Object3D;

    constructor() {
        this.element = new THREE.GridHelper(50, 50);
        this.element.name = 'helper'
        this.element.addEventListener('update',(event)=>{
            const location = JSON.parse(event.message);
            this.update(location);
        })
    }

    getElement(): Object3D {
        return this.element;
    }

    update(location: JsonCenterLocation): void {
        const offset = 0.5;
        this.element.position.set(location.x + offset, 0, location.y + offset);
    }


}