<template>
  <nav>
    <router-link to="/" @click="handleHomeClick">
      <img src="@/assets/logo.svg" alt="menu" />
    </router-link>
    <MenuItem
      v-for="(item, index) in menuElements"
      :key="index"
      :id="index"
      :title="item.title"
      :items="item?.elements"
      :is-last="menuElements.length === index + 1"
      @opened-menu="handleOpenedMenu"
      :is-opened="currentOpenedId === index"
    />
  </nav>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import MenuItem from './MenuItem.vue';
import colorPallete from '@/utils/colorPallete';

const route = useRoute();
defineProps({
  menuElements: {
    type: Array,
    required: true,
  },
});

watch(route, () => {
  currentOpenedId.value = null;
});

const currentOpenedId = ref(null);

const handleHomeClick = () => {
  currentOpenedId.value = null;
};

const handleOpenedMenu = id => {
  if (currentOpenedId.value === id) {
    currentOpenedId.value = null;
  } else {
    currentOpenedId.value = id;
  }
};
</script>
<style scoped>
nav {
  display: flex;
  flex-wrap: wrap;
  background-color: v-bind('colorPallete.secondary.white');
  border-bottom: 3px solid v-bind('colorPallete.custom.solid.ligthGray');
  padding: 0 30px 0 0px;
}

img {
  height: 90px;
}
</style>
