<template>
  <div>
    <PageTitle title="Eksplorator obiektów organizacji" />
    <div class="filter-wrapper">
      <NSwitch size="large" :rail-style="railStyle">
        <template #checked> Użytkownik </template>
        <template #unchecked> Komputer </template>
      </NSwitch>
      <NInput
        type="text"
        placeholder="SamAccountName, user principal name, imię i nazwisko, email, telefon lub przełożony"
        clearable=""
        :input-props="{ autocomplete: 'off' }"
        style="max-width: 700px"
      />
      <NInput
        type="text"
        placeholder="Kontener OU"
        clearable=""
        :input-props="{ autocomplete: 'off' }"
        class="filter-element"
      />
      <NSelect placeholder="Stanowisko" clearable class="filter-element" />
      <NSelect placeholder="Organizacja" clearable class="filter-element" />
      <NSelect
        placeholder="Kolumny"
        :options="columnsOptions"
        clearable
        class="filter-element"
        v-model:value="chosenColumns"
        multiple
      />
    </div>
    <DataTable
      :columns="filteredColumns"
      v-model:data.lazy="filteredData"
      :loading="isLoading"
      sorted
    />
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { NSwitch, NInput, NSelect } from 'naive-ui';
import { useStorage } from '@vueuse/core';
import PageTitle from '@/components/PageTitle.vue';
import DataTable from '@/components/DataTable.vue';

const domainUsers = useStorage('domainUsers', []);
const isLoading = ref(false);
const chosenColumns = ref([]);

const filteredData = computed(() => {
  return domainUsers.value;
});

const railStyle = ({ focused, checked }) => {
  const style = {};
  if (checked) {
    style.background = '#92D050';
    if (focused) {
      style.boxShadow = '0 0 0 2px #92D05040';
    }
  } else {
    style.background = '#2080f0';
    if (focused) {
      style.boxShadow = '0 0 0 2px #2080f040';
    }
  }
  return style;
};

const columns = [
  {
    key: 'samAccountName',
    title: 'SamAccountName',
    type: String,
  },
  {
    key: 'userPrincipalName',
    title: 'User PrincipalName',
    type: String,
  },
  {
    key: 'nameAndLastname',
    title: 'Imię i nazwisko',
    type: String,
  },
  {
    key: 'email',
    title: 'Email',
    type: String,
  },
  {
    key: 'telephone',
    title: 'Telefon',
    type: String,
  },
  {
    key: 'DN',
    title: 'Kontener OU',
    type: String,
  },
  {
    key: 'lastLogonOnprem',
    title: 'Data ostatniego logowania AD',
    type: Date,
  },
  {
    key: 'passwordExpires',
    title: 'Wygasające hasło',
    type: Date,
  },
  {
    key: 'passwordLastSet',
    title: 'Data ustawionej ostatnio daty',
    type: Date,
  },
  {
    key: 'jobTitle',
    title: 'Stanowisko',
    type: String,
  },
  {
    key: 'manager',
    title: 'Przełożony',
    type: String,
  },
  {
    key: 'organization',
    title: 'Organizacja',
    type: String,
  },
];

const filteredColumns = computed(() => {
  if (chosenColumns.value.length > 0) {
    return columns.filter(x => chosenColumns.value.includes(x.key));
  } else return columns;
});

const columnsOptions = [
  {
    label: 'samAccountName',
    value: 'samAccountName',
  },
  {
    label: 'userPrincipalName',
    value: 'userPrincipalName',
  },
  {
    label: 'nameAndLastname',
    value: 'nameAndLastname',
  },
  {
    label: 'email',
    value: 'email',
  },
  {
    label: 'telephone',
    value: 'telephone',
  },
  {
    label: 'DN',
    value: 'DN',
  },
  {
    label: 'lastLogonOnprem',
    value: 'lastLogonOnprem',
  },
  {
    label: 'passwordExpires',
    value: 'passwordExpires',
  },
  {
    label: 'passwordLastSet',
    value: 'passwordLastSet',
  },
  {
    label: 'jobTitle',
    value: 'jobTitle',
  },
  {
    label: 'manager',
    value: 'manager',
  },
  {
    label: 'organization',
    value: 'organization',
  },
];
</script>
<style scoped>
.filter-wrapper {
  padding-bottom: 10px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-element {
  max-width: 200px;
}
</style>
