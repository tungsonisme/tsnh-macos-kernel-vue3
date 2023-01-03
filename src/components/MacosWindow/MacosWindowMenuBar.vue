<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useAppStore } from '../../stores';

const props = defineProps<{ appName: string }>();

const { launchedApps, close, minimize, enterFullScreen, exitFullScreen } =
  useAppStore();
const appInstance = computed(
  () =>
    launchedApps.find((item) => item.appName === props.appName)?.instances[0]
);

const handleFullScreenIconClick = () => {
  appInstance.value?.fullScreenId
    ? exitFullScreen(props.appName)
    : enterFullScreen(props.appName);
};
</script>

<template>
  <div class="macos-window-menu-bar">
    <div class="icon-wrapper">
      <div class="icon close-icon" @click="close(props.appName)"></div>
      <div class="icon minimize-icon" @click="minimize(props.appName)"></div>
      <div
        class="icon full-screen-icon"
        @click="handleFullScreenIconClick"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.macos-window-menu-bar {
  background-color: lightgray;
  padding: 12px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.icon-wrapper {
  display: flex;
  align-items: center;
}

.icon {
  border-radius: 50%;
  width: 16px;
  height: 16px;
  margin-right: 6px;

  &.close-icon {
    background-color: red;
  }

  &.minimize-icon {
    background-color: green;
  }

  &.full-screen-icon {
    background-color: yellow;
  }
}
</style>
