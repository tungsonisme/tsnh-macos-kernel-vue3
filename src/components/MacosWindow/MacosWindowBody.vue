<template>
  <div class="macos-window-body">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.macos-window-body {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid lightgray;
  flex: 1;
  background-color: #242424;
  color: white;
}
</style>
