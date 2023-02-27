<script setup lang="ts">
import * as THREE from 'three'
import {defineProps,inject} from "vue"

const props = defineProps({
  geometry: THREE.BufferGeometry
})

const mesh = inject<THREE.Mesh | null>("mesh", null);
if (mesh !== null) {
  mesh.geometry = props.geometry;
}

</script>
<template></template>