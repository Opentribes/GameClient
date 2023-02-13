<script setup lang="ts">
import {onMounted, ref} from "vue";
import SceneRendererFactory from "../SceneRendererFactory";
import TileRepository from "../repository/TileRepository";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


const root = ref<HTMLElement | null>(null);

const loader =  new GLTFLoader();
const factory = new SceneRendererFactory();
const repository = new TileRepository(tiles,loader);

onMounted(async function () {
  const element = root.value;
  if (element === null) {
    return;
  }
  const tileList = await repository.getTileList();
  const sceneRenderer = factory.createDefaultRenderer(element, true);
  const scene = sceneRenderer.getScene();

  const tile = tileList.get(1);
  console.log(tile.object);
scene.add(tile.object);
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