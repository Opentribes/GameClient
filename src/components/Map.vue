<script setup lang="ts">
import {onMounted, ref} from "vue";
import SceneRendererFactory from "../SceneRendererFactory";
import TileRepository from "../repository/TileRepository";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import GameMap from "../GameMap";
import MapUpdater from "../MapUpdater";
import * as THREE from 'three';
import UpdateBoxHelper from "../helpers/UpdateBoxHelper";

const root = ref<HTMLElement | null>(null);

const loader = new GLTFLoader();
const factory = new SceneRendererFactory();
const repository = new TileRepository(tiles, loader);

onMounted(async function () {
  const element = root.value;
  if (element === null) {
    return;
  }
  await repository.loadTiles();
  const debugMode = true;
  const sceneRenderer = factory.createDefaultRenderer(element, centerLocation, debugMode);
  const scene = sceneRenderer.getScene();


  const map = new GameMap(repository, scene);
  map.drawTiles(mapData);

  const mapUpdater = new MapUpdater(centerLocation);
  const updateBox = mapUpdater.getBox();
  const updateBoxSize = mapUpdater.getSize();

  if (debugMode) {
    sceneRenderer.addHelper(new UpdateBoxHelper(updateBox));
  }


  window.addEventListener('keypress', async (event) => {

    sceneRenderer.onMove(event);
    const centerLocation = sceneRenderer.getCenterLocation()
    const centerPoint = new THREE.Vector3(centerLocation.x, 0, centerLocation.y);
    if (!updateBox.containsPoint(centerPoint)) {
      await map.updateTiles(centerLocation,updateBoxSize)
      updateBox.setFromCenterAndSize(centerPoint, updateBoxSize);

    }
  }, false)

  sceneRenderer.render();
});

</script>
<template>
  <div id="map" ref="root">

  </div>
</template>
<style>
#map {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
</style>