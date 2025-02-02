<template>
  <WithAuth :menu="menu">
    <Transition name="nav" mode="out-in">
      <NavbarComponent v-show="store.isAuthenticated" :menu-elements="menu" />
    </Transition>
    <HeroImage />
    <ViewWrapper :apply-wrapper="afterIsAuthenticated">
      <RouterView v-slot="{ Component }">
        <NNotificationProvider placement="top">
          <Transition name="view" mode="out-in" @after-enter="handleWrapper">
            <Component :is="Component" class="global-style" />
          </Transition>
        </NNotificationProvider>
      </RouterView>
    </ViewWrapper>
    <Transition name="footer" mode="out-in">
      <FooterComponent v-show="store.isAuthenticated" />
    </Transition>
  </WithAuth>
</template>

<script setup>
import { ref } from 'vue';
import { NNotificationProvider } from 'naive-ui';
import { useAuthenticationStore } from '@/stores/AuthenticationStore';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeroImage from '@/components/HeroImage.vue';
import WithAuth from '@/components/hoc/WithAuth.vue';
import ViewWrapper from '@/components/ViewWrapper.vue';
import menu from '@/utils/menu';
import colorPallete from '@/utils/colorPallete';

const store = useAuthenticationStore();
const afterIsAuthenticated = ref(false);
const handleWrapper = () => {
  if (store.isAuthenticated) {
    afterIsAuthenticated.value = true;
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300&display=swap');

html,
body {
  margin: 0;
}

#app {
  font-family: 'poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.global-style {
  color: v-bind('colorPallete.custom.solid.darkGray');
}

.nav-enter-from,
.nav-leave-to {
  transform: translateY(-100%);
}

.nav-enter-active,
.nav-leave-active {
  transition: transform 0.5s ease-out;
}

.view-enter-from,
.view-leave-to {
  opacity: 0;
}

.view-enter-active,
.view-leave-active {
  transition: opacity 0.3s ease-out;
}

.footer-enter-from,
.footer-leave-to {
  transform: translateY(100%);
}

.footer-enter-active,
.footer-leave-active {
  transition: transform 0.5s ease-out;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
