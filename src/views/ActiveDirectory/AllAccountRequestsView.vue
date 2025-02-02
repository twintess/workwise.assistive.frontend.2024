<template>
  <div>
    <PageTitle title="Wszystkie wnioski" />
    <div class="filter-wrapper">
      <NSelect
        v-model:value="selectedStatusFilter"
        placeholder="Wybierz status wniosku"
        :options="statusOptions"
        clearable
        class="filter-element"
      />
      <NSelect
        v-model:value="selectedAccountTypeFilter"
        placeholder="Wybierz typ"
        :options="accountOptions"
        clearable
        class="filter-element"
      />
      <NInput
        type="text"
        placeholder="Nazwa konta, email lub przełożony"
        clearable
        :input-props="{ autocomplete: 'off' }"
        @input="handleSearchInput"
      />
    </div>
    <DataTable
      :columns="columns"
      v-model:data.lazy="filteredData"
      :loading="isLoading"
      details-path="/account-request"
      edit-path="/edit-account-request"
      delete-path="/delete-account-request"
      data-key="requestStatus"
      sorted
    >
    </DataTable>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useStorage, useDebounceFn } from '@vueuse/core';
import { NSelect, NInput } from 'naive-ui';
import PageTitle from '@/components/PageTitle.vue';
import DataTable from '@/components/DataTable.vue';

const accountRequests = useStorage('accountRequests', []);
const selectedStatusFilter = ref(null);
const selectedAccountTypeFilter = ref(null);
const searchText = ref(null);
const isLoading = ref(false);
const debounceSearch = useDebounceFn(value => {
  searchText.value = value;
  isLoading.value = false;
}, 1000);

const columns = [
  {
    key: 'requestDate',
    title: 'Data wniosku',
    type: Date,
  },
  {
    key: 'accountType',
    title: 'Typ konta',
    type: String,
  },
  {
    key: 'employeeAccountName',
    title: 'Nazwa konta',
    type: String,
  },
  {
    key: 'email',
    title: 'Adres email',
    type: String,
  },
  {
    key: 'firstManager',
    title: 'Przełożony',
    type: String,
  },
  {
    key: 'requestStatus',
    title: 'Status wniosku',
    type: String,
  },
];

const statusOptions = [
  {
    value: 'Zrealizowany',
    label: 'Zrealizowany',
  },
  {
    value: 'Utworzony',
    label: 'Utworzony',
  },
  {
    value: 'Zaakceptowany',
    label: 'Zaakceptowany',
  },
];

const accountOptions = [
  {
    value: 'Konto 1',
    label: 'one',
  },
  {
    value: 'Konto 2',
    label: 'two',
  },
  {
    value: 'Konto 3',
    label: 'three',
  },
];

const filteredData = computed(() => {
  let result = accountRequests.value;

  if (selectedStatusFilter.value) {
    result = result.filter(
      item => item.requestStatus === selectedStatusFilter.value,
    );
  }

  if (selectedAccountTypeFilter.value) {
    result = result.filter(
      item => item.accountType === selectedAccountTypeFilter.value,
    );
  }

  if (searchText.value) {
    result = result.filter(
      item =>
        item.employeeAccountName
          ?.toLowerCase()
          .match(searchText.value?.toLowerCase()) ||
        item.email?.toLowerCase().match(searchText.value?.toLowerCase()) ||
        item.firstManager?.toLowerCase().match(searchText.value?.toLowerCase()),
    );
  }

  return result;
});

const handleSearchInput = async value => {
  isLoading.value = true;
  await debounceSearch(value);
};
</script>
<style scoped>
.filter-wrapper {
  padding-bottom: 10px;
  display: flex;
  gap: 20px;
}

.filter-element {
  max-width: 200px;
}
</style>
