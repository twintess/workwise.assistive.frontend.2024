<template>
  <div>
    <PageTitle title="Wszystkie wnioski dostępowe" />
    <DataTable
      :columns="columns"
      v-model:data.lazy="accessRequests"
      sorted
      data-key="directory"
      v-model:is-visible.lazy="isContextVisible"
      @context-row-click="handleContext"
    >
      <template #contextMenu>
        <ContextMenu v-model:is-visible.lazy="isContextVisible">
          <li
            class="context-menu-element"
            @click="event => handleAccessRequestLink('Zaakceptowany')"
          >
            Zaakceptuj wniosek
          </li>
          <li
            class="context-menu-element"
            @click="event => handleAccessRequestLink('Odrzucony')"
          >
            Odrzuć wniosek
          </li>
        </ContextMenu>
      </template>
    </DataTable>
    <NModal
      v-model:show="showModal"
      preset="dialog"
      :show-icon="false"
      :title="
        actionChoice === 'Zaakceptowany'
          ? 'Akceptacja wniosku'
          : 'Odrzucenie wniosku'
      "
      :content="
        actionChoice === 'Zaakceptowany'
          ? 'Czy napewno chcesz zaakceptować wniosek?'
          : 'Czy napewno chcesz odrzucić wniosek'
      "
      :positive-text="
        actionChoice === 'Zaakceptowany' ? 'Zaakceptuj' : 'Odrzuć'
      "
      negative-text="Anuluj"
      @positive-click="event => handleAccessRequestChoice(actionChoice)"
      @negative-click="event => handleAccessRequestChoice()"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { NModal, useNotification } from 'naive-ui';
import { useStorage } from '@vueuse/core';
import DataTable from '@/components/DataTable.vue';
import PageTitle from '@/components/PageTitle.vue';
import ContextMenu from '@/components/ContextMenu.vue';

const accessRequests = useStorage('accessRequests', []);
const notification = useNotification();

const columns = [
  {
    key: 'requestor',
    title: 'Zgłaszający',
    type: String,
  },
  {
    key: 'directory',
    title: 'Katalog',
    type: String,
  },
  {
    key: 'permissionType',
    title: 'Poziom uprawnień',
    type: String,
  },
  {
    key: 'requestDate',
    title: 'Data utworzenia',
    type: Date,
  },
  {
    key: 'requestStatus',
    title: 'Status wniosku',
    type: String,
  },
];

const isContextVisible = ref(false);
const contextClickRowId = ref(null);
const showModal = ref(false);
const actionChoice = ref(null);

const handleContext = rowId => {
  contextClickRowId.value = rowId;
};

const handleAccessRequestLink = choice => {
  actionChoice.value = choice;
  showModal.value = true;
};

const handleAccessRequestChoice = choice => {
  if (choice) {
    const foundItem = accessRequests.value.find(
      item => item.directory === contextClickRowId.value,
    );

    const itemIndex = accessRequests.value.findIndex(
      item => item.directory === contextClickRowId.value,
    );

    foundItem.requestStatus = choice;

    accessRequests.value[itemIndex] = foundItem;
    isContextVisible.value = false;

    const notificationOptions = {
      title: 'Aktualizacja wniosku',
      content: `Wniosek został ${actionChoice.value.toLowerCase()}`,
      duration: 5000,
      closable: true,
    };

    if (actionChoice.value === 'Zaakceptowany') {
      notification.success(notificationOptions);
    } else {
      notification.error(notificationOptions);
    }
  } else {
    showModal.value = false;
    actionChoice.value = null;
  }
};
</script>
<style scoped></style>
