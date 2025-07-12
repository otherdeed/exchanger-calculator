<template>
  <div class="block-header">
    <h1 class="block-header-title">
      {{ title }}
    </h1>
    <CommonInput
      :model-value="searchValue"
      @update:model-value="handleSearchUpdate"
      icon="search"
      placeholder="Поиск валюты"
    />
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string
  isGiveAway: boolean
}

const props = defineProps<Props>()
const storeExangePair = useExchangePair()


const searchValue = computed(() => 
  props.isGiveAway ? storeExangePair.giveAwaySearch : storeExangePair.receiveSearch
)

const handleSearchUpdate = (value: string) => {
  if (props.isGiveAway) {
    storeExangePair.handleGiveAwaySearch(value)
  } else {
    storeExangePair.handleReceiveSearch(value)
  }
}
</script>

<style scoped lang="scss">
.block-header {
  background-color: $block_bg_light;
  border-radius: 10px 10px 0px 0px;
  padding: 20px;

  &-title {
    margin: 0;
    margin-bottom: 10px;
    @include gilroy-bold(24px, $txt_main, 100%, 700)
  }
}
</style>