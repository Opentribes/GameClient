<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from 'vue-router'
import SceneRendererFactory from "../SceneRendererFactory";
import TileRepository from "../repository/TileRepository";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import GameMap from "../GameMap";
import MapUpdater from "../MapUpdater";
import * as THREE from 'three';
import UpdateBoxHelper from "../helpers/UpdateBoxHelper";
import {JsonMapData} from "../types/JsonMapData";

const root = ref<HTMLElement | null>(null);

const loader = new GLTFLoader();
const factory = new SceneRendererFactory();
const repository = new TileRepository(tiles, loader);
const router = useRouter();
onMounted(async function () {
  const element = root.value;
  if (element === null) {
    return;
  }
  const jsonMap: JsonMapData = mapData;

  const debugMode = true;
  const sceneRenderer = factory.createDefaultRenderer(element, jsonMap.viewport.center, debugMode);
  const scene = sceneRenderer.getScene();


  await repository.loadTiles(scene, jsonMap.viewport.width * jsonMap.viewport.height);

  const map = new GameMap(repository, scene);


  map.drawTiles(jsonMap);

  const mapUpdater = new MapUpdater(jsonMap.viewport.center);
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
      await map.updateTiles(jsonMap)
      updateBox.setFromCenterAndSize(centerPoint, updateBoxSize);
      router.push({
        name: 'map',
        params: {
          locationX: centerLocation.x,
          locationY: centerLocation.y
        }
      })

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