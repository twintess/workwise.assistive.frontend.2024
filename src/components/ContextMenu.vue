<template>
  <ul
    class="context-menu-wrapper"
    ref="contextRef"
    v-if="isVisible"
    :style="{ top: y + 'px', left: x + 'px' }"
  >
    <slot>
      <li class="context-menu-element" v-if="editPath !== ''">
        <RouterLink class="context-menu-link" :to="editPath">
          <FontAwesomeIcon
            class="context-menu-icon"
            icon="fa-solid fa-pencil"
          />
          Edytuj
        </RouterLink>
      </li>
      <li class="context-menu-element" v-if="deletePath !== ''">
        <RouterLink class="context-menu-link" :to="deletePath">
          <FontAwesomeIcon
            class="context-menu-icon"
            icon="fa-solid fa-trash-can"
          />
          Usuń
        </RouterLink>
      </li>
    </slot>
  </ul>
</template>
<script setup>
import { ref } from 'vue';
import { onClickOutside, useMouse, useParentElement } from '@vueuse/core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import colorPallete from '@/utils/colorPallete';

defineProps({
  editPath: {
    type: String,
    required: false,
    default: '',
  },
  deletePath: {
    type: String,
    required: false,
    default: '',
  },
});

const isVisible = defineModel('isVisible', { type: Boolean, required: false });
const contextRef = ref(null);

const parentEl = useParentElement();
const extractor = event => {
  if (!isVisible.value) {
    return [event.clientX, event.clientY];
  }
};
const { x, y } = useMouse({ target: parentEl, type: extractor });

onClickOutside(contextRef, () => {
  if (isVisible.value) {
    isVisible.value = false;
  }
});
</script>
<style>
.context-menu-wrapper {
  position: absolute;
  z-index: 2;
  list-style-type: none;
  text-align: left;
  border-radius: 3px;
  background-color: v-bind('colorPallete.accent.darkTeal');
  padding: 0;
}

.context-menu-element {
  transition: 0.3s;
  display: flex;
  align-items: center;
  padding: 15px 25px 15px 15px;
}

.context-menu-element:hover {
  background-color: v-bind('colorPallete.accent.brightTeal');
  cursor: pointer;
  border-radius: 3px;
}

.context-menu-element,
.context-menu-link {
  color: v-bind('colorPallete.secondary.white');
  display: block;
  margin: 0;
}

.context-menu-link {
  text-decoration: none;
}

.context-menu-icon {
  height: 20px;
  margin-right: 10px;
}
</style>
