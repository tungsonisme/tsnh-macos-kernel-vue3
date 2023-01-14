<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, defineProps } from 'vue';
import { useAppStore } from '../../stores';
import useMove from './useMove';

const props = defineProps<{ appName: string }>();

const emit = defineEmits<{
  (e: 'positionUpdate', distance: { top: number; left: number }): void;
}>();

const store = useAppStore();
const { activeAppInfo } = storeToRefs(store);
const { apps, launchedApps, close, minimize, enterFullScreen, exitFullScreen } =
  store;

const appTitle = computed(
  () => apps.find((item) => item.name === props.appName)?.title
);

const isInactive = computed(
  () => activeAppInfo?.value.app?.name !== props.appName
);

const { handleMouseDown } = useMove(props.appName, (data) =>
  emit('positionUpdate', data)
);

function handleFullScreenIconClick() {
  const appInstance = launchedApps.find(
    (item) => item.appName === props.appName
  )?.instances[0];

  if (appInstance) {
    appInstance?.fullScreenId
      ? exitFullScreen(props.appName)
      : enterFullScreen(props.appName);
  }
}
</script>

<template>
  <div
    class="macos-window-menu-bar"
    :class="{ inactive: isInactive }"
    @mousedown="handleMouseDown"
  >
    <div class="icon-wrapper">
      <div
        class="icon close-icon"
        @click="
          (e) => {
            close(props.appName);
            e.stopPropagation();
          }
        "
      ></div>
      <div
        class="icon minimize-icon"
        @click="
          (e) => {
            minimize(props.appName);
            e.stopPropagation();
          }
        "
      ></div>
      <div
        class="icon full-screen-icon"
        @click="
          (e) => {
            handleFullScreenIconClick();
            e.stopPropagation();
          }
        "
      ></div>
    </div>

    <div class="app-name">
      {{ appTitle }}
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
    border: 0.5px solid rgba(0, 0, 0, 0.12);
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

.macos-window-menu-bar.inactive {
  background: #f6f6f6 !important;

  .icon {
    background-color: #e3e3e3 !important;
  }

  .app-name {
    color: rgba(60, 60, 67, 0.6) !important;
  }
}
</style>
