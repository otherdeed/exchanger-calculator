<template>
  <div class="block-component">
    <BlockHeader v-if="title" :title="title" :isGiveAway />
    <div class="block-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title?: string;
  isGiveAway?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  title: "",
  isGiveAway: false,
});
</script>

<style scoped lang="scss">
.block-component {
  width: 500px;
  height: 800px;
  overflow: hidden;
  border-radius: 10px;
  background-color: $block_bg;
  display: flex;
  flex-direction: column;
}

.block-content {
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
  min-height: 0;
  scrollbar-width: thin;
  scrollbar-color: $link $block_bg;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $link;
    border-radius: 3px;
    border: 1px solid transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
}
</style>