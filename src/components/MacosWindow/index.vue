<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import { useAppStore } from '../../stores';
import MacosWindowMenuBar from './MacosWindowMenuBar.vue';
import MacosWindowBody from './MacosWindowBody.vue';

const props = defineProps<{ appName: string }>();

const top = ref(100);
const left = ref(100);
const width = ref(1024);
const height = ref(768);

const { launchedApps, focus } = useAppStore();
const appInstance = computed(
  () =>
    launchedApps.find((item) => item.appName === props.appName)?.instances[0]
);
const macosWindowStyle = computed(() => ({
  ...(appInstance.value?.fullScreenId
    ? {
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }
    : {
        top: `${top.value}px`,
        left: `${left.value}px`,
        width: `${width.value}px`,
        height: `${height.value}px`,
      }),
  display: appInstance?.value?.minimized ? 'none' : 'flex',
  'z-index': appInstance.value?.layout.zIndex,
}));

const handlePositionUpdate = (distance: { top: number; left: number }) => {
  top.value = top.value + distance.top;
  left.value = left.value + distance.left;
};

const handleClick = () => {
  focus(props.appName);
};
</script>

<template>
  <div class="macos-window" :style="macosWindowStyle" @click="handleClick">
    <MacosWindowMenuBar
      :app-name="props.appName"
      @position-update="handlePositionUpdate"
    />
    <MacosWindowBody>
      <slot />
    </MacosWindowBody>
  </div>
</template>

<style lang="scss" scoped>
.macos-window {
  position: fixed;
  flex-direction: column;
  resize: both;
  overflow: auto;
}
</style>
