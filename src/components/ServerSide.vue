<script setup lang="ts">
import {onMounted} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute()

onMounted(function () {
  globalThis.location.href = route.params.pathMatch;
})
</script>
<template></template>