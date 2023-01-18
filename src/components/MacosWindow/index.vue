<script setup lang="ts">
import { useAppStore } from '../../stores';
import MacosWindowMenuBar from './MacosWindowMenuBar.vue';
import MacosWindowBody from './MacosWindowBody.vue';
import useStyle from './useStyle';

const props = defineProps<{ appName: string }>();

const { focus } = useAppStore();

const { macosWindowStyle, isFullScreen, handlePositionUpdate } = useStyle(
  props.appName
);

const handleClick = () => {
  focus(props.appName);
};

// TODO: add defaultStyles
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
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.15))
    drop-shadow(0 25px 30px rgba(0, 0, 0, 0.35));

  &.full-screen {
    width: 100vw !important;
    height: 100vh !important;
  }
}
</style>
