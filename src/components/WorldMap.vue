<script setup lang="ts">
import {onMounted, ref, defineProps, computed, reactive, onUpdated, provide, created} from "vue"
import {degToRad} from "three/src/math/MathUtils"
import {JsonMapData} from "../types/JsonMapData"
import {getMesh, Tile} from "../entity/Tile"
import * as THREE from 'three'
import MapViewport from "./MapViewport.vue";
import Geometry from "./three/Geometry.vue";
import Material from "./three/Material.vue";
import Stats from 'three/examples/jsm/libs/stats.module.js';

const mapTiles: Tile[] = tiles
const map: JsonMapData = mapData

const camera = ref(null)
const renderer = ref(null)
const centerPosition = ref(map.viewport.center)


const tilesLoaded = ref(false);
const debugMode = ref(true)

let loaded = 0;
const stats = Stats()

const centerPosition3D = computed(() => {
  return [centerPosition.value.x, 0, centerPosition.value.y]
})

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

const helperPosition = computed(() => {
  return [centerPosition.value.x, 0.1, centerPosition.value.y]
})

const tileCount = computed(() => {
  return map.viewport.height * map.viewport.width
});


onMounted(() => {

  const threeCamera: THREE.PerspectiveCamera = camera.value.three
  threeCamera.rotateX(degToRad(-45))
  threeCamera.fov = 50

  const threeRenderer: THREE.Renderer = renderer.value.three

  threeRenderer.physicallyCorrectLights = true;
  threeRenderer.outputEncoding = THREE.sRGBEncoding;
  threeRenderer.setClearColor(0xcccccc);

  if (debugMode) {
    threeRenderer.domElement.parentNode.appendChild(stats.domElement)
  }

  window.addEventListener('keypress', keyPress, false)
})
provide('centerPosition', centerPosition)

async function keyPress(event: KeyboardEvent) {
  const moveSpeed = 1;
  if (event.key === 'd') {
    centerPosition.value.x += moveSpeed;
  }
  if (event.key === 'a') {
    centerPosition.value.x -= moveSpeed;
  }
  if (event.key === 'w') {
    centerPosition.value.y -= moveSpeed;
  }
  if (event.key === 's') {
    centerPosition.value.y += moveSpeed;
  }
}

function onTileLoaded(object: THREE.Object3D, tile: Tile) {
  tile.mesh = getMesh(object);
  tile.mesh.scale
  loaded++
  tilesLoaded.value = loaded === mapTiles.length;
}

function beforeRender() {
  stats.begin()
}

function afterRender() {
  stats.end()
}
</script>
<template>


  <div id="map">
    <Renderer ref="renderer"
              :antialias="true"
              :autoResize="true"
              :alpha="true"
              :onBeforeRender="beforeRender"
              :onAfterRender="afterRender">
      <PerspectiveCamera ref="camera" :position="cameraPosition"/>
      <Scene background="#eeeeee">
        <AmbientLight :color="0xffffff" :position="lightPosition" :intensity="0.8"/>
        <DirectionalLight :color="0xffffff" :position="lightPosition" :intensity="1"/>

        <div v-if="debugMode">
          <GridHelper :size="50" :divisions="50" :position="gridPosition"/>
          <AxesHelper :size="5" :position="centerPosition3D"/>
          <Mesh name="currentLocation" :position="helperPosition">
            <BoxGeometry :width="0.5" :height="0" :depth="0.5"/>
            <MeshBasicMaterial :color="0xff0000"/>
          </Mesh>
        </div>

        <GLTFLoader
            v-for="tile in mapTiles"
            @load="(object)=>{onTileLoaded(object,tile)}"
            :url="tile.path"
            :position="[0, -100, 0]"
        />
        <div v-if="tilesLoaded">
          <InstancedMesh
              v-for="tile in mapTiles"
              :ref="(mesh)=>{mesh.three.name = tile.id.toString()}"
              :count="tileCount"
          >
            <Geometry :geometry="tile.mesh.geometry"/>
            <Material :material="tile.mesh.material"/>
          </InstancedMesh>

          <MapViewport
              :map="map"
              :debugMode="debugMode"
          />

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