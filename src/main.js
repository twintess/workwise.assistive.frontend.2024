import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faLock,
  faEnvelope,
  faPencil,
  faTrashCan,
  faCircleXmark,
  faUser,
  faRightFromBracket,
  faUserPlus,
  faRectangleList,
  faUnlockKeyhole,
  faCalendarDays,
  faMagnifyingGlassChart,
  faSquarePollVertical,
  faSliders,
  faChartLine,
  faRankingStar,
  faChartArea,
  faClipboardQuestion,
  faClipboardList,
  faPlus,
  faSquarePlus,
  faWindowRestore,
  faListOl,
  faWindowMaximize,
  faArrowDown,
  faAngleLeft,
  faAngleRight,
  faUserShield,
  faFileCirclePlus,
  faFolderOpen,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from '@/App.vue';
import routes from './utils/routes';

library.add(
  faLock,
  faEnvelope,
  faPencil,
  faTrashCan,
  faCircleXmark,
  faUser,
  faRightFromBracket,
  faUserPlus,
  faRectangleList,
  faUnlockKeyhole,
  faCalendarDays,
  faMagnifyingGlassChart,
  faSquarePollVertical,
  faSliders,
  faChartLine,
  faRankingStar,
  faChartArea,
  faClipboardQuestion,
  faClipboardList,
  faPlus,
  faSquarePlus,
  faWindowRestore,
  faListOl,
  faWindowMaximize,
  faCalendarDays,
  faArrowDown,
  faAngleLeft,
  faAngleRight,
  faUserShield,
  faFileCirclePlus,
  faFolderOpen,
  faUsers,
  faMicrosoft,
);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(pinia)
  .mount('#app');
