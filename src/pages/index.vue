<template>
  <div class="main-page">
    <BlockComponent
        title="Отдаете"
        :isGiveAway="true"
      >
      <ErrorComponent v-if="error"/>
      <LoaderComponent v-if="pending"/>
      <CardListComponent
        v-else
        :currencies='filteredGiveAwayList'
        :isGiveAway="true"
      />
    </BlockComponent>

    <BlockComponent
      title="Получаете"
    >
      <ErrorComponent v-if="loadingAndErrors.errorReceive"/>
      <LoaderComponent v-if="loadingAndErrors.loadingReceive"/>
      <CardListComponent
        v-if="!loadingAndErrors.loadingReceive && !loadingAndErrors.errorReceive"
        :currencies='filteredReceiveList'
      />
    </BlockComponent>

    <BlockComponent>
      <ErrorComponent v-if="loadingAndErrors.errorExchangePair"/>
      <LoaderComponent v-if="loadingAndErrors.loadingExchangePair"/>
      <FormComponent
        v-if="getExhangePair && !loadingAndErrors.loadingExchangePair && !loadingAndErrors.errorExchangePair"
        :structure="getExhangePair"
        :key="getExhangePair.course"
      />
    </BlockComponent>
  </div>
</template>

<script setup lang="ts">

import { api } from '~/api/apis';
import type { TCurrency } from '~/types/exchange';
import type { TLoadingAndErrors } from '~/types/loading';
const baseUrl = useRuntimeConfig().public.apiUrl

const loadingAndErrors = useState<TLoadingAndErrors>('loadingAndErrors', () => ({
  loadingReceive: false,
  loadingExchangePair: false,
  errorReceive: false,
  errorExchangePair: false,
}));
const {setAllCurrencyList, setgiveAwayList} = useExchangeList()
const {filteredGiveAwayList, filteredReceiveList } = storeToRefs(useExchangeList())
const { getExhangePair } = storeToRefs(useExchangePair())

const { pending, error } = useAsyncData(
  api.currencyList,
  async () => {
    const currencyctList = await $fetch<TCurrency[]>(baseUrl + api.currencyList)
    setAllCurrencyList(currencyctList)
    const giveAwayIdsList = await $fetch<[string]>(baseUrl + api.giveAwayIdsList)
    setgiveAwayList(giveAwayIdsList)
  }
)
</script>

<style scoped lang="scss">
.main-page{
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>