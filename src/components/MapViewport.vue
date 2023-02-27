<script setup lang="ts">
import * as THREE from 'three'
import {onMounted, ref, defineProps, computed, inject} from "vue"
import {useRouter} from 'vue-router'
import {JsonCenterLocation, JsonMapData} from "../types/JsonMapData"
import ViewPortBoundaryBox from "./three/ViewPortBoundaryBox.vue";

const router = useRouter()
const scene = inject('scene');
const props = defineProps({
  debugMode: Boolean,
  map: JsonMapData
})
onMounted(() => {
  drawTiles(props.map, scene)
})


async function reload(centerLocation: JsonCenterLocation) {
  const headers = new Headers();
  headers.append('X-Requested-With', 'XMLHttpRequest');
  const response = await fetch(`/map/${centerLocation.x}/${centerLocation.y}`, {headers: headers})
  const data = await response.json()
  drawTiles(data.map, scene);
  router.push({
    name: 'map',
    params: {
      locationX: centerLocation.x,
      locationY: centerLocation.y
    }
  })
}

function drawTiles(data: JsonMapData, scene: THREE.Scene) {
  const tempObject = new THREE.Object3D();
  const viewport = data.viewport;

  data.layers.background.forEach((tileJson) => {
        try {

          const mesh = scene.getObjectByName(tileJson.data.toString());

          if (!(mesh instanceof THREE.InstancedMesh)) {
            return;
          }

          const normalizedLocation = {
            x: tileJson.location.x - (viewport.center.x - ~~(viewport.width / 2)),
            y: tileJson.location.y - (viewport.center.y - ~~(viewport.height / 2))
          }


          tempObject.position.set(tileJson.location.x, 0, tileJson.location.y);
          tempObject.scale.set(0.5, 0.5, 0.5);
          tempObject.updateMatrix()

          const index = (normalizedLocation.y + 1) * viewport.width + normalizedLocation.x

          mesh.setMatrixAt(index, tempObject.matrix)
          mesh.instanceMatrix.needsUpdate = true;
        } catch (error) {
          return;
        }
      }
  )


}


</script>
<template>
  <ViewPortBoundaryBox
      :width="16"
      :height="10"
      :debugMode="debugMode"
      @update="reload"
  />
</template>