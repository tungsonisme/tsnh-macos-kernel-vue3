<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{ msg: string }>();
</script>

<template>
  <h1>UPDATED v2: {{ msg }}</h1>
</template>
