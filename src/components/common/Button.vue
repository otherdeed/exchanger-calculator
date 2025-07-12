<template>
  <button class="common-button">
    <slot/>
  </button>
</template>

<script setup lang="ts">
type Props = {
  padding?: string
  borderRadius?: string
}

const props = withDefaults(defineProps<Props>(),{
  padding: '2px 5px',
  borderRadius:'5px'
})
</script>

<style scoped lang="scss">
.common-button{
  display: flex;
  align-items: center;
  justify-content: center;
  gap:10px;
  background-color:$link;
  border-radius: v-bind(borderRadius);
  padding: v-bind(padding);
}
</style>