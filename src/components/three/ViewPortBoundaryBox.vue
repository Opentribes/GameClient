<script setup lang="ts">
import * as THREE from 'three'
import {onMounted, defineProps, inject, defineEmits, watch} from "vue"
import {JsonCenterLocation} from "../../types/JsonMapData";

const centerPosition = inject('centerPosition')
const scene = inject('scene')

const props = defineProps({
  width: Number,
  height: Number,
  debugMode: Boolean
})
const event = defineEmits<{e:'update', position: JsonCenterLocation}>()

const size = new THREE.Vector3(props.width, 6, props.height)
const box = new THREE.Box3();
const center = new THREE.Vector3(centerPosition.value.x, 0, centerPosition.value.y);

onMounted(() => {

  box.setFromCenterAndSize(center, size)
  if (props.debugMode) {
    const boxHelper = new THREE.Box3Helper(box, new THREE.Color(0xffff00));
    scene.add(boxHelper)
  }
})

watch(centerPosition.value, (currentCenter) => {
  const centerPoint = new THREE.Vector3(currentCenter.x, 0, currentCenter.y);
  if (box.containsPoint(centerPoint)) {
    return
  }
  box.setFromCenterAndSize(centerPoint, size);
  event('update',currentCenter)
})

</script>
<template></template>