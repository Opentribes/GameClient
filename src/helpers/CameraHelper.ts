import DebugHelper from "./DebugHelper";
import {Object3D} from "three";
import {JsonCenterLocation} from "../types/JsonMapData";
import * as THREE from 'three';

export default class CameraHelper implements DebugHelper {
    private readonly element: THREE.Camera

    constructor(camera: THREE.Camera) {

        const helper = new THREE.CameraHelper(camera)

        helper.setColors(
            new THREE.Color(0x00A3AA),
            new THREE.Color(0x000000),
            new THREE.Color(0x000000),
            new THREE.Color(0x00AA00),
            new THREE.Color(0xA30000),
        )
        this.element = helper;
        this.element.name = 'helper'
    }


    getElement(): Object3D {
        return this.element;
    }

    update(location: JsonCenterLocation): void {

    }

}