<template>
  <section>
    <div class="form-box">
      <form autocomplete="off">
        <h1>WorkWise Assistive</h1>
        <div class="inputbox">
          <font-awesome-icon icon="fa-solid fa-envelope" />
          <input
            type="text"
            name="username"
            v-model="auth.login"
            autofocus
            required
          />
          <label for="username">Login</label>
        </div>
        <div class="inputbox">
          <font-awesome-icon icon="fa-solid fa-lock" />
          <input
            type="password"
            name="password"
            v-model="auth.password"
            required
          />
          <label for="password">Hasło</label>
        </div>
        <button @click.prevent="handleLogin">Zaloguj</button>
        <button class="provider-button" @click.prevent="handleProvider">
          <font-awesome-icon icon="fa-brands fa-microsoft" />
          <span>Zaloguj kontem MS</span>
        </button>
      </form>
      <label class="error-label">{{ errorMessage }}</label>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { baseURL } from '@/composables/use-axios';
import colorPallete from '@/utils/colorPallete';

const auth = ref({
  login: '',
  password: '',
});
const errorMessage = ref(null);

const handleLogin = async () => {
  // const { data, error } = await useAxiosPublic(null, 'auth/login', 'post', {
  // 	username: auth.value.login,
  // 	password: auth.value.password
  // }, () => router.push('/login'))
  // if (data.value?.status === 200) {
  // 	store.setAuthentication(data.value.data.username, true, data.value.data.roles)
  // 	router.push('/')
  // }
  // else if (error.value !== null) {
  // 	store.setAuthentication(null, false, [])
  // 	switch (error.value?.response.status) {
  // 		case 401:
  // 			errorMessage.value = "Login lub hasło jest nieprawidłowe"
  // 			break;
  // 		default:
  // 			errorMessage.value = "Błąd logowania. Prosimy o kontakt z administratorem"
  // 			break;
  // 	}
  // }
  // else {
  // 	store.setAuthentication(null, false, [])
  // }
};

const handleProvider = async () =>
  (window.location.href = `${baseURL}/api/auth/login`);
</script>
<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: url('../assets/login_background.jpeg') no-repeat;
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0;
}

h1 {
  font-size: 3rem;
  color: v-bind('colorPallete.secondary.white');
  text-align: center;
  margin: 0;
}

.form-box {
  position: relative;
  width: 400px;
  padding: 80px 60px;
  background: transparent;
  border: 2px solid v-bind('colorPallete.custom.transparent.grey');
  border-radius: 20px;
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 0px 0px 64px -13px v-bind('colorPallete.custom.solid.greyBlue');
  -moz-box-shadow: 0px 0px 64px -13px v-bind('colorPallete.custom.solid.greyBlue');
  box-shadow: 0px 0px 64px -13px v-bind('colorPallete.custom.solid.greyBlue');
}

.inputbox {
  position: relative;
  margin: 30px 0;
  border-bottom: 2px solid v-bind('colorPallete.secondary.white');
}

.inputbox label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  color: v-bind('colorPallete.secondary.white');
  font-size: 1rem;
  pointer-events: none;
  transition: 0.3s;
}

input:focus ~ label,
input:valid ~ label {
  top: -5px;
}

.inputbox input {
  width: 100%;
  height: 50px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0 35px 0 5px;
  color: v-bind('colorPallete.secondary.white');
}

::-ms-reveal {
  display: none;
}

.inputbox svg {
  position: absolute;
  left: 0;
  color: v-bind('colorPallete.secondary.white');
  font-size: 1.3rem;
  top: 15px;
  transform: translateX(-150%);
}

button {
  width: 100%;
  padding: 15px;
  border-radius: 40px;
  background: v-bind('colorPallete.secondary.white');
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  transition:
    background-color 0.3s,
    color 0.3s;
}

button:hover,
button:focus {
  background-color: v-bind('colorPallete.primary.brightPurple');
  color: v-bind('colorPallete.secondary.white');
}

.provider-button {
  margin-top: 20px;
}

.provider-button svg {
  margin-right: 20px;
}

.error-label {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 20px;
  padding: 5px;
  font-weight: bold;
  font-size: 1.2rem;
  color: v-bind('colorPallete.secondary.white');
}
</style>
