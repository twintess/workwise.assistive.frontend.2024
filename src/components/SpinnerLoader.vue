<template>
  <div class="loader">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<script setup>
import colorPallete from '@/utils/colorPallete';
</script>
<style scoped>
.loader {
  width: 40px;
  height: 40px;
  background: linear-gradient(
    v-bind('colorPallete.primary.brightPurple'),
    v-bind('colorPallete.primary.brightPurple'),
    v-bind('colorPallete.accent.brightTeal')
  );
  /* background: linear-gradient(#14ffe9, #ffeb3b, #ff00e0); */
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: rotate 0.6s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader span {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(
    v-bind('colorPallete.primary.brightPurple'),
    v-bind('colorPallete.primary.brightPurple'),
    v-bind('colorPallete.accent.brightTeal')
  );
}

.loader span:nth-child(1) {
  filter: blur(5px);
}

.loader span:nth-child(2) {
  filter: blur(10px);
}

.loader span:nth-child(3) {
  filter: blur(15px);
}

.loader span:nth-child(4) {
  filter: blur(25px);
}

.loader span:nth-child(5) {
  filter: blur(30px);
}

.loader::after {
  content: '';
  position: absolute;
  top: 7px;
  left: 7px;
  right: 7px;
  bottom: 7px;
  background-color: v-bind('colorPallete.secondary.white');
  border-radius: 50%;
  filter: blur(1px);
}
</style>
