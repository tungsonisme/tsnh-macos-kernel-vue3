<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import { useAppStore } from '../../stores';
import MacosWindowMenuBar from './MacosWindowMenuBar.vue';
import MacosWindowBody from './MacosWindowBody.vue';

const props = defineProps<{ appName: string }>();

const top = ref(100);
const left = ref(100);

const { launchedApps, focus } = useAppStore();

const appInstance = computed(
  () =>
    launchedApps.find((item) => item.appName === props.appName)?.instances[0]
);

const isFullScreen = computed(() => !!appInstance.value?.fullScreenId);

const macosWindowStyle = computed(() => ({
  ...(isFullScreen.value
    ? {
        top: 0,
        left: 0,
      }
    : {
        top: `${top.value}px`,
        left: `${left.value}px`,
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

// TODO: add inactive styles
// TODO: add real resize UX
</script>

<template>
  <div
    class="macos-window"
    :class="{ 'full-screen': isFullScreen }"
    :style="macosWindowStyle"
    @click="handleClick"
  >
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
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.15))
    drop-shadow(0 25px 30px rgba(0, 0, 0, 0.35));
  width: 1024px;
  height: 768px;

  &.full-screen {
    width: 100vw !important;
    height: 100vh !important;
  }
}
</style>
