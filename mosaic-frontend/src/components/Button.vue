<template>
  <button :class="['btn', type]" type="submit" @click="$emit('click')">
    {{ title }}
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  title: String,
  type: String,
});
defineEmits(["click"]);
</script>

<style scoped>
/* CSS */
.btn {
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  font-size: 16px;
}

.btn.primary:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-btn 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-btn {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.btn.primary:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #222;
  left: 0;
  top: 0;
  border-radius: 10px;
}

.btn.secondary {
  padding: 0.6em 2em;
  border: transparent;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin: 20px 0;
}
.btn.secondary :hover {
  -webkit-box-shadow: 0px 0px 53px 15px rgba(163, 89, 247, 0.9);
  -moz-box-shadow: 0px 0px 53px 15px rgba(163, 89, 247, 0.9);
  box-shadow: 0px 0px 53px 15px rgba(163, 89, 247, 0.9);
}
</style>
