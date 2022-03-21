<script setup lang="ts">
type PROPS = {
  id: string;
  star: number;
  count?: boolean;
};
const { id, star, count } = defineProps<PROPS>();
</script>

<template>
  <div class="rating rating-half">
    <input
      v-for="(i, key) in 10"
      :key="key"
      type="radio"
      :name="`rating${id}`"
      class="bg-green-500 mask mask-star-2"
      :class="i % 2 === 0 ? 'mask-half-2' : 'mask-half-1'"
      :checked="i === star"
      disabled
    />

    <span v-if="count" class="ml-2">{{ `(${star})` }}</span>
  </div>
</template>
