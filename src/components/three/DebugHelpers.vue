<script setup lang="ts">
import {inject, computed} from "vue"
const centerPosition = inject('centerPosition')

const gridPosition = computed(() => {
  const gridOffset = 0.5
  return [centerPosition.value.x + gridOffset, 0, centerPosition.value.y + gridOffset]
})

const helperPosition = computed(() => {
  return [centerPosition.value.x, 0.1, centerPosition.value.y]
})

const centerPosition3D = computed(() => {
  return [centerPosition.value.x, 0, centerPosition.value.y]
})

</script>
<template>
  <GridHelper :size="50" :divisions="50" :position="gridPosition"/>
  <AxesHelper :size="5" :position="centerPosition3D"/>
  <Mesh name="currentLocation" :position="helperPosition">
    <BoxGeometry :width="0.5" :height="0" :depth="0.5"/>
    <MeshBasicMaterial :color="0xff0000"/>
  </Mesh>
</template>