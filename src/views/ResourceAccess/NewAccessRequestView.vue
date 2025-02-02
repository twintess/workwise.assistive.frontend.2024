<template>
  <div>
    <PageTitle title="Nowy wniosek dostępowy" />
    <n-form
      class="main-form"
      ref="formRef"
      :model="model"
      :rules="rules"
      size="medium"
    >
      <n-form-item label="Katalog" path="directory">
        <n-select
          v-model:value="model.directory"
          placeholder="Wybierz katalog"
          :options="directoriesChoice"
        />
      </n-form-item>
      <n-form-item label="Poziom uprawnień" path="permissionType">
        <n-select
          v-model:value="model.permissionType"
          placeholder="Wybierz poziom uprawnień"
          :options="permissionTypeChoice"
        />
      </n-form-item>
      <n-form-item class="stretch">
        <n-button round type="primary" @click.prevent="handleNewAccountSubmit">
          Utwórz wniosek
        </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useStorage, useDateFormat, useNow } from '@vueuse/core';
import { NForm, NFormItem, NSelect, NButton, useNotification } from 'naive-ui';
import PageTitle from '@/components/PageTitle.vue';
import { useRouter } from 'vue-router';

const rules = {
  directory: {
    required: true,
    message: 'Pole wymagane',
  },
  permissionType: {
    required: true,
    message: 'Pole wymagane',
  },
};

const directoriesChoice = [
  {
    label: 'Katalog 1.1',
    value: 'Katalog 1.1',
  },
  {
    label: 'Katalog 1.2',
    value: 'Katalog 1.2',
  },
  {
    label: 'Katalog 999.1',
    value: 'Katalog 999.1',
  },
];

const permissionTypeChoice = [
  {
    label: 'Odczyt',
    value: 'Odczyt',
  },
  {
    label: 'Zapis',
    value: 'Zapis',
  },
];

const accessRequests = useStorage('accessRequests', []);
const formRef = ref(null);
const model = ref({});
const notification = useNotification();
const router = useRouter();

const handleNewAccountSubmit = () => {
  formRef.value?.validate(errors => {
    if (!errors) {
      const createdAccessRequest = {
        ...model.value,
        requestor: 'Tomasz Testowy',
        requestStatus: 'Utworzony',
        requestDate: useDateFormat(useNow(), 'DD-MM-YYYY HH:mm:ss'),
      };

      notification.success({
        title: 'Informacja o uprawnieniach',
        content: 'Wniosek na uprawnienia utworzony pomyślnie',
        duration: 10000,
        closable: true,
      });

      accessRequests.value.push(createdAccessRequest);
      router.push('/');
    }
  });
};
</script>
<style scoped>
.main-form {
  grid-template-columns: 1fr;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1500px;
  text-align: left;
  display: grid;
  gap: 10px 40px;
}

.stretch {
  grid-column: 1 / -1;
  margin: 0 auto;
}
</style>
