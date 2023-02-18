import SceneRenderer from "./SceneRenderer";
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import {JsonCenterLocation} from "./types/JsonMapData";
import GridHelper from "./helpers/GridHelper";
import AxisHelper from "./helpers/AxisHelper";
import LocationHelper from "./helpers/LocationHelper";
import CameraHelper from "./helpers/CameraHelper";
import UpdateBoxHelper from "./helpers/UpdateBoxHelper";

export default class SceneRendererFactory {

    createDefaultRenderer(container: HTMLElement, centerLocation: JsonCenterLocation, debugMode: boolean = false): SceneRenderer {

        const width = container.clientWidth
        const height = container.clientHeight
        const aspectRatio = width / height

        const camera = new THREE.PerspectiveCamera(50, aspectRatio)
        const scene = new THREE.Scene()



        const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(width, height)
        const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        scene.add(light);


        const locationHelper = new LocationHelper();
        const defaultSceneRenderer = new SceneRenderer(container, centerLocation, camera, scene, renderer)
        if (debugMode) {
            defaultSceneRenderer.addHelper(new GridHelper());
            defaultSceneRenderer.addHelper(new AxisHelper());
            defaultSceneRenderer.addHelper(locationHelper);

          //  defaultSceneRenderer.addHelper(new CameraHelper(camera));
            defaultSceneRenderer.enableStats(Stats())
        }



        window.addEventListener('resize', () => {
            const width = container.clientWidth
            const height = container.clientHeight
            const aspectRatio = width / height

            camera.aspect = aspectRatio
            camera.updateProjectionMatrix()
            renderer.setSize(width, height)
            defaultSceneRenderer.render()
        }, false)

        return defaultSceneRenderer;
    }

}