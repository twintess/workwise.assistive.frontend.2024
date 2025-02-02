<template>
  <section>
    <p>
      &copy;
      <span v-if="deploymentYear !== currentYear">{{ deploymentYear }} - </span>
      {{ currentYear }}
      WorkWise Assistive
    </p>
  </section>
</template>
<script setup>
import { ref } from 'vue';
import colorPallete from '@/utils/colorPallete';

const deploymentYear = 2024;
const currentYear = ref(new Date().getFullYear());
</script>
<style scoped>
section {
  background-color: v-bind('colorPallete.custom.solid.ligthGray');
  padding: 30px 0;
  margin-top: auto;
}
</style>
