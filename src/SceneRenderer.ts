import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import {JsonCenterLocation} from "./types/JsonMapData";
import {degToRad} from "three/src/math/MathUtils";
import DebugHelper from "./helpers/DebugHelper";

export default class SceneRenderer {
    camera: THREE.Camera
    scene: THREE.Scene
    renderer: THREE.Renderer
    stats?: Stats
    container: HTMLElement

    centerLocation: JsonCenterLocation

    constructor(container: HTMLElement, centerLocation: JsonCenterLocation, camera: THREE.Camera, scene: THREE.Scene, renderer: THREE.Renderer) {
        this.camera = camera
        this.scene = scene
        this.renderer = renderer
        this.container = container
        this.centerLocation = centerLocation
        this.initCamera()
        container.appendChild(renderer.domElement)
    }

    private initCamera() {
        this.camera.rotateX(degToRad(-45));
        this.updateCamera()
    }

    getScene(): THREE.Scene {
        return this.scene;
    }

    enableStats(stats: Stats) {
        this.stats = stats
        this.container.appendChild(this.stats.domElement)
    }

    render(): void {
        this.stats?.begin()
        const self = this

        this.renderer.render(this.scene, this.camera)
        this.stats?.end()
        requestAnimationFrame(function () {
            self.render()
        });
    }

    addHelper(helper: DebugHelper): void {
        this.scene.add(helper.getElement())
        helper.update(this.centerLocation);
    }

    updateCamera() {
        const offset = 7;
        this.camera.position.set(this.centerLocation.x, offset, this.centerLocation.y + offset);
    }

    onMove(event: KeyboardEvent) {
        const moveSpeed = 0.5;
        if (event.key === 'd') {
            this.centerLocation.x += moveSpeed;
        }
        if (event.key === 'a') {
            this.centerLocation.x -= moveSpeed;
        }
        if (event.key === 'w') {
            this.centerLocation.y -= moveSpeed;
        }
        if (event.key === 's') {
            this.centerLocation.y += moveSpeed;
        }

        this.updateCamera()
        this.updateHelpers()
    }


    private updateHelpers() {
        const helpers = this.scene.getObjectsByProperty('name', 'helper');
        if (helpers === undefined) {
            return
        }
        const locationString = JSON.stringify(this.centerLocation);

        helpers.forEach((helper) => {
            helper.dispatchEvent({type: 'update', message: locationString});
        });
    }
}