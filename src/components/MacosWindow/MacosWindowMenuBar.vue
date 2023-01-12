<script setup lang="ts">
import { computed, defineProps, onMounted, onUnmounted, ref } from 'vue';
import { useAppStore } from '../../stores';

const props = defineProps<{ appName: string }>();

const emit = defineEmits<{
  (e: 'positionUpdate', distance: { top: number; left: number }): void;
}>();

const isMouseDown = ref(false);

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

const handleMouseDown = () => {
  isMouseDown.value = true;
};

const handleMouseMove = (e: MouseEvent) => {
  if (isMouseDown.value) {
    emit('positionUpdate', { top: e.movementY, left: e.movementX });
  }
};

const handleMouseUp = () => {
  isMouseDown.value = false;
};

onMounted(() => {
  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  document.removeEventListener('mouseup', handleMouseUp);
  document.removeEventListener('mousemove', handleMouseMove);
});
</script>

<template>
  <div class="macos-window-menu-bar" @mousedown="handleMouseDown">
    <div class="icon-wrapper">
      <div class="icon close-icon" @click="close(props.appName)"></div>
      <div class="icon minimize-icon" @click="minimize(props.appName)"></div>
      <div
        class="icon full-screen-icon"
        @click="handleFullScreenIconClick"
      ></div>
    </div>

    <div class="app-name">
      {{ props.appName }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './styles.scss';

$padding: 8px;
$height: 28px;

.macos-window-menu-bar {
  background: rgba(244, 245, 245, 0.95);
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;
  box-shadow: 0 0.5px 0 rgba(0, 0, 0, 0.15),
    inset 0 -0.5px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  height: $height;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  position: absolute;
  left: $padding;
  top: $padding;

  .icon {
    border-radius: 50%;
    width: 12px;
    height: 12px;
    margin-right: 8px;

    &.close-icon {
      background-color: #ff3b30;
    }

    &.minimize-icon {
      background-color: #fc0;
    }

    &.full-screen-icon {
      background-color: #34c759;
    }
  }
}

.app-name {
  text-align: center;
  font-weight: 700;
  font-size: 13px;
  height: $height;
  line-height: $height;
}
</style>
