<template>
  <form class="form-component">
    <div class="form-component-field">
      <span class="form-component-field-title">Одаете</span>
      <CommonInput
        :modelValue="String(exchangPair.from)"
        @update:modelValue="(value) => handleFromChange(String(value))"
        :class="{ 'form-component-field-input-error': !fromValid }"
        type="exchange"
        :text="giveAway?.name || ''"
        :src="baseUrl + giveAway?.logo.simple"
        :placeholder="String(props.structure.from.min)"
        bck="#1D1E25"
      />
      <div class="form-component-field-text">
        <span>
          Мин: {{ `${props.structure.from.min} ${props.structure.from.currency}` }}
        </span>
        <span>
          Макс: {{ `${props.structure.from.max} ${props.structure.from.currency}`}}
        </span>
      </div>
    </div>

    <div class="form-component-field">
      <span class="form-component-field-title">Получаете</span>
      <CommonInput
        :modelValue="String(exchangPair.to)"
        @update:modelValue="(value) => handleToChange(String(value))"
        :class="{ 'form-component-field-input-error': !toValid }"
        type="exchange"
        :text="receive?.name || ''"
        :src="baseUrl + receive?.logo.simple"
        :placeholder="String(props.structure.to.min)"
        bck="#1D1E25"
      />
      <div class="form-component-field-text">
        <span>
          Мин: {{ `${props.structure.to.min} ${props.structure.to.currency}` }}
        </span>
        <span>
          Макс: {{ `${props.structure.to.max} ${props.structure.to.currency}`}}
        </span>
      </div>
    </div>

    <span class="form-component-title">Ваши Реквизиты</span>
    <CommonInput
      v-for="input in props.structure.structure.from.input"
      :placeholder="input.receive.placeholder"
      bck="#1D1E25"
    />
    <CommonInput
      v-for="input in props.structure.structure.to.input"
      :placeholder="input.receive.placeholder"
      bck="#1D1E25"
    />
    <label class="form-component-checkbox">
      <input
        type="checkbox"
        id="agreement"
        class="checkbox-input"
      />
      <span class="checkbox-custom"></span>
      <span>
        Я согласен с
        <NuxtLink 
          to="/"
          class="form-component-link"
        >
          обработкой персональных
        </NuxtLink> 
        данных и принимаю 
        <NuxtLink 
          to="/"
          class="form-component-link"
        >
          правила обмена
        </NuxtLink>
      </span>
    </label>
    <CommonButton
      borderRadius="10px"
      padding="15px"
      class="form-component-button"
    >
      <NuxtIcon name="swap"/>
      Перейти к оплате
    </CommonButton>
  </form>
</template>

<script setup lang="ts">
import type { TCurrencyPair } from '~/types/exchange';

type Props = {
  structure: TCurrencyPair
}
const props = defineProps<Props>()
const baseUrl = useRuntimeConfig().public.apiUrl;

const storeExangePair = useExchangePair()
const {giveAway, receive} = storeToRefs(storeExangePair)

const exchangPair = reactive({
  to: props.structure.to.min,
  from: props.structure.from.min,
  course: props.structure.course
});

const fromValid = ref(true);
const toValid = ref(true);

const handleFromChange = (value: string) => {
  let cleanedValue = value.replace(/[^\d.]/g, '');
  const parts = cleanedValue.split('.');
  if (parts.length > 2) {
    cleanedValue = parts[0] + '.' + parts.slice(1).join('');
  }

  if (cleanedValue === '') {
    fromValid.value = false;
    exchangPair.from = 0;
    exchangPair.to = 0;
    return;
  }

  const numValue = parseFloat(cleanedValue);
  fromValid.value = numValue >= props.structure.from.min && numValue <= props.structure.from.max;
  exchangPair.from = numValue;
  exchangPair.to = parseFloat((exchangPair.from * exchangPair.course).toFixed(props.structure.to.round));
};

const handleToChange = (value: string) => {
  let cleanedValue = value.replace(/[^\d.]/g, '');
  const parts = cleanedValue.split('.');
  if (parts.length > 2) {
    cleanedValue = parts[0] + '.' + parts.slice(1).join('');
  }

  if (cleanedValue === '') {
    toValid.value = false;
    exchangPair.to = 0;
    exchangPair.from = 0;
    return;
  }

  const numValue = parseFloat(cleanedValue);
  toValid.value = numValue >= props.structure.to.min && numValue <= props.structure.to.max
  exchangPair.to = numValue;
  exchangPair.from = parseFloat((exchangPair.to / exchangPair.course).toFixed(props.structure.from.round));
};

</script>

<style scoped lang="scss">
.form-component {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &-title {
    margin: 0;
    margin-bottom: 10px;
    @include gilroy-bold(24px, $txt_main, 100%, 700);
  }

  &-checkbox {
    display: flex;
    align-items: center;
    gap: 12px;
    @include gilroy-light(15px, $txt_gray, 100%, 400);
    cursor: pointer;
  }

  &-field{
    display: flex;
    flex-direction: column;
    gap: 5px;

    &-text{
      display: flex;
      justify-content: space-between;
      @include gilroy-light(14px, $txt_gray, 100%, 400)
    }
    &-input-error{
      border: 1px solid red;
      border-radius: 10px;
    }
  }

  &-link {
    color: $link;
  }

  &-button{
    margin: 0 auto;
    width: 220px;
  }

  .checkbox-input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;

    &:checked + .checkbox-custom {
      background-color: $link;
      border-color: $link;

      &::after {
        display: block;
      }
    }
  }

  .checkbox-custom {
    position: relative;
    width: 18px;
    height: 18px;
    border: 2px solid $link;
    border-radius: 4px;
    background-color: $block_bg_light;
    flex-shrink: 0;

    &::after {
      content: "";
      position: absolute;
      display: none;
      left: 7px;
      top: 4px;
      scale: 130%;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
}
</style>