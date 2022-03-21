<script setup lang="ts">
const { alert } = useCartAlert();
</script>

<template>
  <div
    v-if="alert"
    class="fixed bottom-20 md:bottom-4 left-4 alert alert-success shadow-lg z-50 w-[calc(100vw-32px)]"
  >
    <div>
      <span class="material-icons"> check </span>

      <span>Add to cart!</span>
    </div>
  </div>
</template>
