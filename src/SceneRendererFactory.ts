import SceneRenderer from "./SceneRenderer";
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

export default class SceneRendererFactory {

    createDefaultRenderer(container: HTMLElement): SceneRenderer {

        const width = container.clientWidth;
        const height = container.clientHeight;
        const aspectRatio = width / height;

        const camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 10000);
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        const defaultSceneRenderer = new SceneRenderer(container, camera, scene, renderer);
        defaultSceneRenderer.enableStats(Stats());


        return defaultSceneRenderer;
    }
}