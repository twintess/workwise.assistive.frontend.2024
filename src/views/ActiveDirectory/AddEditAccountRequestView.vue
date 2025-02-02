<template>
  <div>
    <PageTitle title="Nowe konto" />
    <n-form
      class="main-form"
      ref="formRef"
      :model="model"
      :rules="rules"
      size="medium"
    >
      <n-form-item label="Typ" path="accountType">
        <n-select
          v-model:value="model.accountType"
          placeholder="Wybierz typ"
          :options="accountTypeChoice"
        />
      </n-form-item>
      <n-form-item
        label="Imię i Nazwisko"
        path="accountName"
      >
        <n-input
          v-model:value="model.accountName"
          placeholder="Dane"
        />
      </n-form-item>
      <n-form-item label="Nazwa konta" path="aaccountName">
        <n-input
          v-model:value="model.aaccountName"
          placeholder="Dane konta"
        />
      </n-form-item>
      <n-form-item label="Miasto" path="location">
        <n-select
          v-model:value="model.location"
          placeholder="Miasto"
          :options="locationChoice"
        />
      </n-form-item>
      <n-form-item label="Dodatkowe dane" path="additionalData">
        <n-input
          v-model:value="model.additionalData"
          placeholder="Dodatkowe dane"
        />
      </n-form-item>
      <n-form-item label="Dodatkowy status" path="isExtension">
        <n-switch v-model:value="model.isExtension" />
      </n-form-item>
      <n-form-item label="Czas działania">
        <n-date-picker
          v-model:value="model.workingTime"
          type="date"
          placeholder="Od"
        />
        <n-date-picker
          v-model:value="model.accountExpireTo"
          type="date"
          placeholder="Do"
        />
      </n-form-item>
      <template v-if="model.accountType != 'Konto 1'">
        <n-form-item label="ID" path="accountId">
          <n-input
            v-model:value="model.accountId"
            placeholder="ID"
          />
        </n-form-item>
        <n-form-item label="Stanowisko" path="position">
          <n-input v-model:value="model.position" placeholder="Stanowisko" />
        </n-form-item>
        <n-form-item label="Departament" path="department">
          <n-select
            v-model:value="model.department"
            placeholder="Departament"
            :options="departmentChoice"
          />
        </n-form-item>
        <n-form-item
          label="Imię i Nazwisko 2"
          path="data2"
        >
          <n-input
            v-model:value="model.data2"
            placeholder="Dane 2"
          />
        </n-form-item>
        <n-form-item
          label="Imię i Nazwisko 3"
          path="data3"
        >
          <n-input
            v-model:value="model.data3"
            placeholder="Dane 3"
          />
        </n-form-item>
        <n-form-item label="Miasto" path="city">
          <n-select
            v-model:value="model.city"
            placeholder="Miasto"
            :options="cityChoice"
          />
        </n-form-item>
        <n-form-item label="QWE" path="qwe">
          <n-input v-model:value="model.qwe" placeholder="QWE" />
        </n-form-item>
        <n-form-item label="Adres email" path="email">
          <n-input
            v-model:value="model.email"
            placeholder="Adres email"
            type="email"
          />
        </n-form-item>
        <n-form-item label="Nr telefonu" path="phone">
          <n-input
            type="tel"
            v-model:value="model.phone"
            placeholder="Nr telefonu dla MFA"
            :input-props="{ pattern: 'tel' }"
          />
        </n-form-item>
        <n-form-item label="Konto 1" path="isAccountOne">
          <n-space>
            <n-switch v-model:value="model.isAccountOne" />
          </n-space>
        </n-form-item>
      </template>
      <template v-if="model.accountType == 'Konto 2'">
        <n-form-item label="Dostęp do portalu" path="accessToPortalEnabled">
          <n-switch v-model:value="model.accessToPortalEnabled" />
        </n-form-item>
        <n-form-item label="Grupy innych" path="groups">
          <n-select
            v-model:value="groups"
            multiple
            placeholder="Grupy"
            disabled
          />
        </n-form-item>
        <n-form-item label="Konto 33" path="isAccount33">
          <n-space>
            <n-switch v-model:value="model.isAccount33" />
          </n-space>
        </n-form-item>
        <n-form-item label="Konto 44" path="isAccount44">
          <n-space>
            <n-switch v-model:value="model.isAccount44" />
          </n-space>
        </n-form-item>
        <n-form-item
          label="Licencja"
          path="license"
        >
          <n-select
            v-model:value="model.license"
            multiple
            placeholder="Licencja"
            clearable
            :options="licenseChoice"
          />
        </n-form-item>
        <n-form-item label="VPN" path="vpn">
          <n-select
            v-model:value="model.vpn"
            placeholder="VPN"
            :options="vpnChoice"
          />
        </n-form-item>
        <n-form-item label="Dostęp dodatkowy" path="additionalAccess">
          <n-select
            v-model:value="model.additionalAccess"
            multiple
            clearable
            placeholder="Dostęp dodatkowy"
            :options="serverChoice"
          />
        </n-form-item>
        <n-form-item label="Role" path="roles">
          <n-select
            v-model:value="model.roles"
            multiple
            clearable
            placeholder="Dostęp"
            :options="customRoles"
          />
        </n-form-item>
      </template>
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
import PageTitle from '@/components/PageTitle.vue';
import {
  NForm,
  NFormItem,
  NSelect,
  NInput,
  NButton,
  NDatePicker,
  NSwitch,
  NSpace,
  useNotification,
} from 'naive-ui';
import { useRouter } from 'vue-router';

const formRef = ref(null);
const model = ref({
  accountType: null,
});
const accountRequests = useStorage('accountRequests', []);
const router = useRouter();
const notification = useNotification();

const rules = {
  accountType: {
    required: true,
    message: 'Pole wymagane',
  },
  accountName: {
    required: true,
    message: 'Pole wymagane',
  },
  email: {
    required: true,
    message: 'Pole wymagane',
  },
  data2: {
    required: true,
    message: 'Pole wymagane',
  },
};

const accountTypeChoice = [
  {
    label: 'Konto 1',
    value: 'Konto 1',
  },
  {
    label: 'Konto 2',
    value: 'Konto 2',
  },
  {
    label: 'Konto 3',
    value: 'Konto 3',
  },
];

const departmentChoice = [
  {
    label: 'Dział 1',
    value: 'Dział 1',
  },
  {
    label: 'Dział 2',
    value: 'Dział 2',
  },
  {
    label: 'Dział 3',
    value: 'Dział 3',
  },
];

const cityChoice = [
  {
    label: 'Warszawa',
    value: 'Warszawa',
  },
  {
    label: 'Kraków',
    value: 'Kraków',
  },
  {
    label: 'Gdynia',
    value: 'Gdynia',
  },
];

const locationChoice = [
  {
    label: 'Warszawa 1',
    value: 'Warszawa 1',
  },
  {
    label: 'Gdańsk 2',
    value: 'Gdańsk 2',
  },
  {
    label: 'Opole 3',
    value: 'Opole 3',
  },
];

const licenseChoice = [
  {
    label: 'Licencja-1',
    value: 'Licencja-1',
  },
  {
    label: 'Licencja-2',
    value: 'Licencja-2',
  },
];

const vpnChoice = [
  {
    label: 'VPN1',
    value: 'VPN1',
  },
  {
    label: 'VPN2',
    value: 'VPN2',
  },
  {
    label: 'VPN3',
    value: 'VPN3',
  },
];

const groups = ['Grupa1', 'Grupa2'];

const serverChoice = [
  {
    label: 'Test1',
    value: 'Test1',
  },
  {
    label: 'Test2',
    value: 'Test2',
  },
  {
    label: 'Test3',
    value: 'Test3',
  },
];

const customRoles = [
  {
    label: 'db-writer',
    value: 'db-writer',
  },
  {
    label: 'db-reader',
    value: 'db-reader',
  },
];

const handleNewAccountSubmit = () => {
  formRef.value?.validate(errors => {
    if (!errors) {
      const createdRequest = {
        ...model.value,
        requestStatus: 'Utworzony',
        requestDate: useDateFormat(useNow(), 'DD-MM-YYYY HH:mm:ss'),
      };

      notification.success({
        title: 'Wniosek na konto',
        content: 'Wniosek utworzony pomyślnie',
        duration: 10000,
        closable: true,
      });

      accountRequests.value.push(createdRequest);
      router.push('/');
    }
  });
};
</script>
<style scoped>
@media (min-width: 540px) {
  .main-form {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 700px) {
  .main-form {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .main-form {
    grid-template-columns: repeat(3, 1fr);
  }
}

.main-form {
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
