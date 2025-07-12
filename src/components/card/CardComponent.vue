<template>
  <div
    @click="receiveIdsList"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    class="card-component"
    :class="{ 'card-component-selected': isSelected }"
  >
    <Transition name="slide-fade">
      <CommonButton v-if="isHovered || isSelected">
        <NuxtIcon name="arrow" />
      </CommonButton>
    </Transition>
    <img
      :src="baseUrl + props.currency.logo.simple"
      loading="eager"
      :alt="currency.name"
      class="card-component-icon"
    />
    <div class="card-component-text">
      <span class="card-component-text__title">
        {{ currency.name }}
      </span>
      <span class="card-component-text__subtitle">
        {{ currency.currency[0] }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from "~/api/apis";
import type { TCurrency, TCurrencyPair } from "~/types/exchange";
import type { TLoadingAndErrors } from "~/types/loading";

const baseUrl = useRuntimeConfig().public.apiUrl;

const loading = useState<TLoadingAndErrors>('loadingAndErrors');

const { setReceiveList } = useExchangeList();
type Props = {
  currency: TCurrency;
  isGiveAway?: boolean;
  isSelected?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  isGiveAway: false,
  isSelected: false,
});

const storeExangePair = useExchangePair()
const { setExhangePair } = storeExangePair
const {giveAway, receive} = storeToRefs(storeExangePair)

const emit = defineEmits(["currencySelected"]);
const isHovered = ref(false);

async function receiveIdsList() {
  if (props.isGiveAway) {
    loading.value.loadingReceive = true
    try {
      const receiveIdsList = await $fetch<[string]>(
        `${baseUrl}${api.receiveIdsList}${props.currency.ids[0]}`
      );
      setReceiveList(receiveIdsList);
      emit("currencySelected", props.currency);
      loading.value.errorReceive = false
    } catch (error) {
      loading.value.errorReceive = true
    } finally{
      loading.value.loadingReceive = false
    }
  } else {
    try {
      loading.value.loadingExchangePair = true
      emit("currencySelected", props.currency);
      const createPair = await $fetch<TCurrencyPair>(
        `${baseUrl}${api.formStructure}${giveAway.value?.ids[0]}/${receive.value?.ids[0]}`
      );
      setExhangePair(createPair)
      loading.value.errorExchangePair = false
    } catch (error) {
      loading.value.errorExchangePair = true
    } finally{
      loading.value.loadingExchangePair = false
    }
  }
}
</script>

<style scoped lang="scss">
.card-component {
  height: 52px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &-selected,
  &:hover {
    margin-left: 10px;
    padding-left: 10px;
    background-color: $block_bg_light;
    height: 52px;
    border-radius: 10px;

    .card-component-icon {
      transform: scale(1.1);
    }
  }

  &-icon {
    width: 35px;
    height: 35px;
    transition: transform 0.5s ease;
  }

  &-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    transition: transform 0.5s ease;

    &__title {
      @include gilroy-bold(16px, $txt_main, 100%, 600);
      transition: color 0.2s ease;
    }

    &__subtitle {
      @include gilroy-light(14px, $txt_gray, 100%, 400);
      transition: color 0.2s ease;
    }
  }
}
</style>