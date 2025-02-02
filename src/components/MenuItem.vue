<template>
  <button
    v-if="authorizedMenuItems.length > 0"
    ref="currentRef"
    @click="currentClick"
    :class="{ 'button-accent': isOpened, 'auto-margin': isLast }"
    type="button"
  >
    {{ title }}
    <span class="icon-toggler" :class="{ 'icon-toggler-opened': isOpened }"
      >></span
    >
  </button>
  <ul
    v-if="isOpened && items !== undefined"
    class="menu"
    :style="positionStyle"
  >
    <RouterLink
      v-for="(item, index) in authorizedMenuItems"
      class="menu-item"
      :key="index"
      :to="'/' + item.path"
      active-class="active-link"
    >
      <FontAwesomeIcon :icon="item.icon" />
      <span>{{ item.menuTitle }}</span>
    </RouterLink>
  </ul>
</template>
<script setup>
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onClickOutside } from '@vueuse/core';
import colorPallete from '@/utils/colorPallete';
import { useAuthenticationStore } from '@/stores/AuthenticationStore';
const store = useAuthenticationStore();

const emit = defineEmits(['openedMenu']);
const currentRef = ref(null);

const authorizedMenuItems = computed(() =>
  props.items.filter(item =>
    store.roles.some(role => role === item.role || item.role === ''),
  ),
);

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: false,
  },
  isOpened: {
    type: Boolean,
    required: true,
  },
  isLast: {
    type: Boolean,
    required: true,
  },
});

const positionStyle = ref(null);

const currentClick = () => {
  emit('openedMenu', props.id);
  const rect = currentRef.value.getBoundingClientRect();

  positionStyle.value = {
    top: rect.top + rect.height + 10 + 'px',
    left: rect.left + 'px',
  };
};

onClickOutside(currentRef, () => {
  if (props.isOpened) {
    emit('openedMenu', null);
  }
});
</script>
<style scoped>
a,
button {
  text-decoration: none;
  background: transparent;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  border: none;
  transition: 0.3s;
  cursor: pointer;
  font-weight: bold;
  color: v-bind('colorPallete.custom.solid.darkGray');
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-family: inherit;
}

button {
  border-radius: 0;
  z-index: 5;
  border-bottom: 3px solid transparent;
}

.button-accent {
  border-bottom: 3px solid v-bind('colorPallete.primary.brightPurple');
}

.auto-margin {
  margin-left: auto;
}

a:hover,
button:hover {
  color: v-bind('colorPallete.primary.brightPurple');
}

.icon-toggler {
  margin-left: 15px;
  transform: rotate(-270deg);
  transition: transform 0.3s ease-out;
}

.icon-toggler-opened {
  transform: rotate(-90deg);
}

.menu {
  list-style-type: none;
  background-color: v-bind('colorPallete.secondary.white');
  margin: 0;
  padding: 0;
  border-radius: 5px;
  z-index: 10;
  position: absolute;
}

.menu-item {
  display: flex;
  justify-content: start;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 10px 20px;
  transition: 0.3s;
}

.menu-item > svg {
  margin-right: 20px;
  width: 20px;
  height: 20px;
}

.menu-item:hover {
  color: v-bind('colorPallete.secondary.white');
  background-color: v-bind('colorPallete.primary.brightPurple');
}

.menu-item:hover > svg {
  color: v-bind('colorPallete.secondary.white');
}

.active-link {
  color: v-bind('colorPallete.secondary.white');
  background-color: v-bind('colorPallete.primary.brightPurple');
}
</style>
