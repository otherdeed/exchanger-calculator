<template>
  <div class="сommon-input">
    <img v-if="src" :src="src" class="сommon-input-image"/>
    <NuxtIcon v-if="icon" :name="icon" class="сommon-input-icon" />
    <span 
      v-if="text"
      class="сommon-input-text"
    >
    {{ text }}
    </span>
    <input
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :placeholder="placeholder"
      :type="typeInput"
      :class="[
        'сommon-input__input', 
        {
          'сommon-input__input-with-icon': icon || src,
          'сommon-input__input-exchange': type === 'exchange'
        }
      ]"
    />
  </div>
</template>

<script setup lang="ts">
type Props = {
  icon?: string;
  text?: string | null;
  type?: 'search' | 'exchange'
  src?: string | null;
  modelValue?: string | number;
  placeholder?: string;
  typeInput?: string;
  bck?: string;
};

const props = withDefaults(defineProps<Props>(), {
  img: null,
  text: null,
  placeholder: "",
  typeInput: "text",
  bck: "#16171C",
});

defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();
</script>

<style scoped lang="scss">
.сommon-input {
  position: relative;
  width: 100%;
  &__input {
    background-color: v-bind(bck);
    color: $txt_main;
    @include gilroy-light(16px, $txt_gray, 100%, 400);
    border-radius: 10px;
    color: $txt_main;
    box-sizing: border-box;
    width: 100%;
    height: 54px;
    padding-left: 16px;
    padding-right: 16px;

    &-with-icon {
      padding-left: 50px;
    }

    &-exchange{
      text-align: end;
    }
  }
  &-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    font-size: 20px;
  }
  &-image{
    position: absolute;
    left: 6px;
    top: 25px;
    transform: translateY(-50%);
    width: 35px;
    height: 35px;
    font-size: 20px;
  }

  &-text{
    position: absolute;
    left: 45px;
    top: 25px;
    transform: translateY(-50%);
  }
}
</style>
