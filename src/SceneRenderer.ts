import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

export default class SceneRenderer {
    camera: THREE.Camera
    scene: THREE.Scene
    renderer: THREE.Renderer
    stats?: Stats
    container: HTMLElement

    constructor(container: HTMLElement, camera: THREE.Camera, scene: THREE.Scene, renderer: THREE.Renderer) {
        this.camera = camera
        this.scene = scene
        this.renderer = renderer
        this.container = container
        container.appendChild(renderer.domElement);
    }

    enableStats(stats: Stats) {
        this.stats = stats;
        this.container.appendChild(this.stats.domElement);
    }

    render(): void {
        this.stats?.begin()
        const self = this;

        this.renderer.render(this.scene, this.camera);
        this.stats?.end();
        requestAnimationFrame(function () {
            self.render();
        });
    }
}