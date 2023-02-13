import SceneRenderer from "./SceneRenderer";
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import {degToRad} from "three/src/math/MathUtils";

export default class SceneRendererFactory {

    createDefaultRenderer(container: HTMLElement, debugMode: boolean = false): SceneRenderer {

        const width = container.clientWidth
        const height = container.clientHeight
        const aspectRatio = width / height

        const camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 10000)
        const scene = new THREE.Scene()
        scene.background = new THREE.Color().setHSL(0.6, 0, 1);
        scene.fog = new THREE.Fog(scene.background, 1, 5000);
        const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(width, height)
        const offset=10;

        const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        scene.add(light);
        camera.position.set(0.5, offset, offset+0.5);


        camera.rotateX(degToRad(-25));


        const defaultSceneRenderer = new SceneRenderer(container, camera, scene, renderer)
        if (debugMode) {

            const gridHelper = new THREE.GridHelper(50, 50);
            scene.add(gridHelper);
            const helper = new THREE.CameraHelper(camera);
            helper.setColors(
                new THREE.Color(0x00A3AA),
                new THREE.Color(0x000000),
                new THREE.Color(0x000000),
                new THREE.Color(0x00AA00),
                new THREE.Color(0xA30000),
            )
            scene.add(helper);


            defaultSceneRenderer.addAxesHelper(new THREE.AxesHelper(20))
            defaultSceneRenderer.enableStats(Stats())
        }

        window.addEventListener('resize', onWindowResize, false)

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
            defaultSceneRenderer.render()
        }

        return defaultSceneRenderer;
    }
}