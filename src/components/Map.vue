<script setup lang="ts">
import {onMounted, ref} from "vue";
import SceneRendererFactory from "../SceneRendererFactory";

const root = ref<HTMLElement | null>(null);

const factory = new SceneRendererFactory();


onMounted(function () {
  const element = root.value;
  if (element === null) {
    return;
  }

  const sceneRenderer = factory.createDefaultRenderer(element);

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