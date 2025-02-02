import { defineStore } from 'pinia';

export const useAuthenticationStore = defineStore('authentication', {
  state: () => {
    return {
      name: null,
      emailAdress: null,
      login: null,
      isAuthenticated: false,
      roles: [],
    };
  },
  actions: {
    setAuthentication(name, emailAdress, login, isAuthenticated, roles) {
      this.name = name;
      this.emailAdress = emailAdress;
      this.login = login;
      this.isAuthenticated = isAuthenticated;
      this.roles = roles;
    },
  },
  getters: {},
});
