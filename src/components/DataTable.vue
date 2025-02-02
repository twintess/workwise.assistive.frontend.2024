<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(column, index) in columns"
          :key="index"
          @click="event => handleSortOrder(column)"
          :class="{
            'active-column-sort':
              sorted && currentColumnSort?.key === column.key,
          }"
        >
          {{ column.title }}
          <FontAwesomeIcon
            v-if="sorted"
            icon="fa-solid fa-arrow-down"
            class="icon"
            :class="{
              'sort-asc':
                currentSortOrder === 'ASC' &&
                currentColumnSort?.key === column.key,
              'sort-desc':
                currentSortOrder === 'DESC' &&
                currentColumnSort?.key === column.key,
            }"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="computedData.length > 0">
        <tr
          v-for="(row, rowIndex) in computedData"
          :key="rowIndex"
          @click.prevent="
            event =>
              detailsPath &&
              dataKey &&
              handleClick(`${detailsPath}/${row[dataKey]}`)
          "
          @contextmenu.prevent="event => handleContextClick(row[dataKey])"
        >
          <td
            v-for="(cell, cellIndex) in columns"
            :key="cellIndex"
            :class="{
              'active-column-sort':
                sorted && currentColumnSort?.key === cell.key,
            }"
          >
            {{ row[cell.key] }}
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td :colspan="columns.length" class="empty-space">
            <slot name="empty"> Brak danych </slot>
          </td>
        </tr>
      </template>
    </tbody>
    <div v-if="loading" class="loading-space">
      <slot name="loading">
        <SpinnerLoader />
      </slot>
    </div>
  </table>
  <div class="pager-wrapper" :colspan="columns.length">
    <div>
      <button
        class="pager-button"
        @click="event => handleGoToPage(-1)"
        :class="{ 'disabled-button': currentPageNumber === 1 }"
      >
        <FontAwesomeIcon
          class="pager-button-image"
          icon="fa-solid fa-angle-left"
        />
      </button>
      <input
        class="pager-input"
        v-model="currentPageNumber"
        @keyup.enter="event => handleGoToPage(currentPageNumber, false)"
      />
      <template v-if="totalPagesCount > 1">
        <div>/</div>
        <div>{{ totalPagesCount }}</div>
      </template>
      <button
        class="pager-button"
        @click="handleGoToPage(1)"
        :class="{ 'disabled-button': currentPageNumber === totalPagesCount }"
      >
        <FontAwesomeIcon
          class="pager-button-image"
          icon="fa-solid fa-angle-right"
        />
      </button>
    </div>
  </div>
  <slot name="contextMenu">
    <ContextMenu
      v-if="editPath || deletePath"
      v-model:is-visible.lazy="isContextVisible"
      :edit-path="editPath + '/' + contextClickRowId"
      :delete-path="deletePath + '/' + contextClickRowId"
    />
  </slot>
</template>
<script setup>
import { ref, computed, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import SpinnerLoader from '@/components/SpinnerLoader.vue';
import ContextMenu from './ContextMenu.vue';
import { useCompare } from '@/composables/use-compare';
import { useSort } from '@/composables/use-sort';
import { useRowLink } from '@/composables/use-row-link';
import { usePagination } from '@/composables/use-pagination';
import colorPallete from '@/utils/colorPallete';

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
  },
  sorted: {
    type: Boolean,
    required: false,
  },
  itemsPerPage: {
    type: Number,
    required: false,
    default: 10,
  },
  detailsPath: {
    type: String,
    required: false,
  },
  editPath: {
    type: String,
    required: false,
  },
  deletePath: {
    type: String,
    required: false,
  },
  dataKey: {
    type: String,
    required: false,
  },
  accentBackgroundColor: {
    type: String,
    required: false,
    default: colorPallete.accent.darkTeal,
  },
  accentForegroundColor: {
    type: String,
    required: false,
    default: colorPallete.secondary.white,
  },
});

const data = defineModel('data', { type: Array, default: [], required: false });
const isContextVisible = defineModel('isVisible', {
  type: Boolean,
  required: false,
});
const contextClickRowId = ref(null);

const { currentSortOrder, currentColumnSort, handleSortOrder } = useSort();
const { currentPageNumber, totalPagesCount, handleGoToPage, updateTotalPages } =
  usePagination(data.value.length, props.itemsPerPage);
const { handleClick } = useRowLink();
const emit = defineEmits(['contextRowClick']);

const computedData = computed(() => {
  let processedData = data.value;

  //sort
  if (props.sorted) {
    if (currentColumnSort.value) {
      processedData = useCompare(
        data.value,
        currentColumnSort.value,
        currentSortOrder.value,
      );
    }
  }

  //pagination
  const startIndex = (currentPageNumber.value - 1) * props.itemsPerPage;
  const endIndex =
    (currentPageNumber.value - 1) * props.itemsPerPage + props.itemsPerPage;

  processedData = processedData.filter(
    (item, index) => index >= startIndex && index < endIndex,
  );

  return processedData;
});

watch(data, () => {
  updateTotalPages(data.value.length);
});

const handleContextClick = id => {
  if (props.dataKey) {
    isContextVisible.value = true;
    contextClickRowId.value = id;
    emit('contextRowClick', id);
  } else {
    console.error('Datakey props not set');
  }
};
</script>
<style scoped>
table {
  border: 1px solid v-bind('colorPallete.secondary.coolGray');
  border-collapse: collapse;
  width: 100%;
  position: relative;
  cursor: pointer;
  font-size: 1rem;
}

th,
td {
  border: 1px solid v-bind('colorPallete.secondary.coolGray');
  padding: 10px;
}

tr {
  transition:
    transform 0.3s,
    background-color 0.3s;
}

tr:nth-child(2n) {
  background-color: v-bind('colorPallete.custom.solid.ligthGray');
}

tr:hover {
  background-color: v-bind('props.accentBackgroundColor');
  color: v-bind('props.accentForegroundColor');
}

tbody > tr:hover {
  transform: scale(1.05);
}

.empty-space {
  padding: 50px;
}

.loading-space {
  background-color: v-bind('colorPallete.custom.transparent.grey');
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  transition: transform 0.3s;
}

.sort-asc {
  transform: rotate(-180deg);
}

.active-column-sort {
  background-color: v-bind('props.accentBackgroundColor');
  color: v-bind('props.accentForegroundColor');
  transition:
    color 0.3s,
    background-color 0.3s;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.pager-wrapper > div {
  display: flex;
  width: 110px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  font-size: 1.3rem;
}

.pager-button {
  border-radius: 5px;
  border: none;
  outline: none;
  height: 30px;
  background-color: v-bind('colorPallete.accent.gold');
}

.pager-button:hover,
.pager-button:focus {
  cursor: pointer;
  opacity: 0.7;
}

.pager-button-image {
  width: 15px;
}

.disabled-button {
  opacity: 0.3 !important;
  cursor: not-allowed !important;
}

.pager-input {
  min-width: 20px;
  max-width: 100px;
  text-align: center;
  border: 1px solid v-bind('colorPallete.accent.gold');
  border-radius: 15%;
  padding: 0 5px;
}

.pager-input:hover,
.pager-input:focus {
  outline: 1px solid v-bind('colorPallete.accent.gold');
}
</style>
