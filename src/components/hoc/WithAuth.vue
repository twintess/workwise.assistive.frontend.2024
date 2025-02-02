<template>
  <slot></slot>
</template>
<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthenticationStore } from '@/stores/AuthenticationStore';
import { useAxiosPublic } from '@/composables/use-axios';
import roles from '@/utils/roles'
import { createGlobalState } from '@vueuse/core';

const props = defineProps({
  menu: {
    type: Array,
    required: true,
  },
});

const router = useRouter();
const store = useAuthenticationStore();

// router.beforeEach(to => {
//   if (to.fullPath !== '/' && to.fullPath !== '/login') {
//     const requiredRouteRole = props.menu
//       .flatMap(item => item.elements)
//       .find(item => item.path === to?.fullPath?.substring(1));

//     if (requiredRouteRole?.role) {
//       const roleVerification = store.roles.filter(
//         role => role === requiredRouteRole?.role,
//       );

//       if (roleVerification.length === 0 && to.fullPath !== '/access-denied') {
//         return '/access-denied';
//       }
//     }
//   }
// });

onMounted(async () => {
  // if (store.login === null || store.isAuthenticated) {
  //   const { data, error } = await useAxiosPublic(
  //     null,
  //     '/api/auth/getuser',
  //     'get',
  //     null,
  //   );

  //   if (data?.value?.status === 200) {
  //     const { isAuthenticated, claims } = data.value.data;

  //     const name = claims.find(claim => claim.type === 'name').value;

  //     const emailaddress = claims.find(claim =>
  //       claim.type.includes('emailaddress'),
  //     ).value;

  //     const preferredUsername = claims.find(
  //       claim => claim.type === 'preferred_username',
  //     ).value;

  //     const roles = claims
  //       .filter(claim => claim.type.includes('role'))
  //       .flatMap(claim => claim.value);

  //     store.setAuthentication(
  //       name,
  //       emailaddress,
  //       preferredUsername,
  //       isAuthenticated,
  //       roles,
  //     );
  //   } else {
  //     store.setAuthentication(null, null, null, false, []);
  //     router.push('/login');
  //   }
  // }

  // //debug

  const valuesArray = Object.values(roles)
  store.setAuthentication('test', 'test@gmail.com', 'test', true, valuesArray);
  router.push('/');
});
</script>
