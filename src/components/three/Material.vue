<script setup lang="ts">
import * as THREE from 'three'
import {defineProps,inject} from "vue"

const props = defineProps({
  material: THREE.Material
})

const mesh = inject<THREE.Mesh | null>("mesh", null);
if (mesh !== null) {
  mesh.material = props.material;
}
</script>
<template></template>