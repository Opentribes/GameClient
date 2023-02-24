<script setup lang="ts">
import {onMounted, ref, defineProps, computed} from "vue";
import {degToRad} from "three/src/math/MathUtils";
import {JsonCenterLocation, JsonMapData} from "../types/JsonMapData";
import Tile from "../entity/Tile";


const camera = ref(null)
const centerPosition = ref({})
const debugMode = true

const cameraPosition = computed(() => {
  const cameraOffset = 5
  return [centerPosition.value.x, cameraOffset, centerPosition.value.y + cameraOffset]
})

const lightPosition = computed(() => {
  const lightOffset = 50;
  return [centerPosition.value.x, lightOffset, centerPosition.value.y]
});

const gridPosition = computed(() => {
  const gridOffset = 0.5
  return [centerPosition.value.x + gridOffset, 0, centerPosition.value.y + gridOffset]
})

onMounted(() => {

  const map: JsonMapData = mapData

  const mapTiles: Tile[] = tiles

  centerPosition.value = map.viewport.center

  iniCamera()
})

function iniCamera() {
  let threeCamera: THREE.PerspectiveCamera = camera.value.three
  threeCamera.rotateX(degToRad(-45))
  threeCamera.fov = 50
}


</script>
<template>


  <div id="map">
    <Renderer ref="renderer" :antialias="true" :autoResize="true" :alpha="true">
      <PerspectiveCamera ref="camera" :position="cameraPosition"/>
      <Scene background="#eeeeee">
        <AmbientLight :color="0xffffff" :position="lightPosition" :intensity="1"/>
        <div v-if="debugMode">
          <GridHelper :size="50" :divisions="50" :position="gridPosition"/>
          <AxesHelper :size="5" :position="[centerPosition.x,0,centerPosition.y]"/>
          <Mesh name="currentLocation" :position="[centerPosition.x,0,centerPosition.y]">
            <BoxGeometry :width="0.5" :height="0" :depth="0.5"/>
            <MeshBasicMaterial :color="0xff0000"/>
          </Mesh>
        </div>


      </Scene>
    </Renderer>
  </div>


</template>
<style>

#map {
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  position: absolute;
}

#map canvas {
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
}
</style>