<template>
  <div class="loader-component">
    <NuxtIcon 
      name="spinner"
      class="loader-component-icon"
    />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.loader-component{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &-icon{
    &:deep(svg){
      width: 50px;
      height: 50px;
    }
  }
}
</style>