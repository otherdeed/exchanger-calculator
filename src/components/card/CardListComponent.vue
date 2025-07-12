<template>
  <div 
    v-if="currencies && currencies.length"
    class="card-list-component"
  >
    <CardComponent
      @currency-selected="handleCurrencySelection"
      v-for="currency in currencies"
      :key="currency.ids[0]"
      :isSelected="props.isGiveAway 
        ? currency.ids[0] === giveAway?.ids[0] 
        : currency.ids[0] === receive?.ids[0]"
      :isGiveAway
      :currency
    />
  </div>
  <div 
    v-else
    class="card-list-component-empty"
  >
    Ничего не найдено
  </div>
</template>

<script setup lang="ts">;
import type { TCurrency } from '~/types/exchange';

type Props = {
  currencies: TCurrency[]
  isGiveAway?: boolean
}
const props = defineProps<Props>()

const storeExangePair = useExchangePair()
const {setGiveAway, setReceive, setExhangePair} = storeExangePair
const {giveAway, receive} = storeToRefs(storeExangePair)


const handleCurrencySelection = (currency: TCurrency) => {
  if (props.isGiveAway) {
    setGiveAway(currency)
    setReceive(null)
    setExhangePair(null)
  } else {
    setReceive(currency)
  }
}


</script>

<style scoped lang="scss">
.card-list-component{
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.card-list-component-empty{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @include gilroy-light(20px, $txt_gray, 100%, 400)
}
</style>