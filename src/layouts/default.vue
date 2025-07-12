<template>
  <div class="layout-default">
      <slot />
  </div>
</template>

<style scoped lang="scss">
.layout-default {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>