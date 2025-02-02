<template>
  <div :class="{ wrapper: applyWrapper }">
    <slot></slot>
  </div>
</template>
<script setup>
defineProps({
  applyWrapper: {
    type: Boolean,
    required: true,
  },
});
</script>
<style scoped>
.wrapper {
  margin: 0 auto;
  padding: 0 50px 50px 50px;
}
</style>
