<template>
  <div class="macos-window-body">
    <slot class="macos-window-body-slot" />
  </div>
</template>

<style lang="scss" scoped>
@import './styles.scss';

.macos-window-body {
  border-bottom-left-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
  flex: 1;
  background-color: black;
  color: white;
  overflow: auto;
}
</style>
