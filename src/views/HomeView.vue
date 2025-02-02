<template>
  <section>
    <div>
      <PageTitle :title="welcomeText" />
      <p>
        <span style="font-weight: bold">WorkWise Assistive</span> centralizuje,
        standaryzuje, automatyzuje oraz ułatwia podgląd i konfigurację stacji
        oraz użytkowników.
      </p>
    </div>
    <div>
      <h2>Obszary zastosowania WorkWise Assistive:</h2>
      <ul>
        <li>Zarządzanie kontami użytkowników</li>
        <li>Raportowanie uprawnień użytkowników do zasobów</li>
        <!-- <li>Podsumowanie incydentów z monitoringu</li> -->
        <li>Raportowanie wyników ankiet dot. zgłoszeń od użytkowników</li>
        <!-- <li>
          Zarządzanie i dystrybucja ekranów blokady na stacje użytkowników
        </li> -->
        <!-- <li>Dystrybucja komunikatów na stacje użytkowników</li> -->
      </ul>
    </div>
  </section>
</template>
<script setup>
import { computed } from 'vue';
import PageTitle from '@/components/PageTitle.vue';
import { useAuthenticationStore } from '@/stores/AuthenticationStore';

const store = useAuthenticationStore();
const welcomeText = computed(
  () => `Witamy ${store.name} w WorkWise Assistive!`,
);
</script>
<style scoped>
section {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

p {
  font-size: 1.2rem;
}

ul {
  font-size: 1rem;
}

li {
  text-align: left;
}
</style>
