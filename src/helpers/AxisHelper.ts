import DebugHelper from "./DebugHelper";
import {Object3D} from "three";
import * as THREE from 'three';
import {JsonCenterLocation} from "../types/JsonMapData";

export default class AxisHelper implements DebugHelper {
    private readonly element: Object3D

    constructor() {
        this.element = new THREE.AxesHelper(20)
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
        this.element.position.set(location.x, 0, location.y);
    }


}