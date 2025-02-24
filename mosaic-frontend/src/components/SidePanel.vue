<template>
  <div class="container">
    <div :class="['side-panel', { open: isOpen }]">
      <button class="close-btn" @click="isOpen = !isOpen">
        <img class="arrow" :src="Arrow" alt="Arrow icon" />
      </button>
      <div class="content" v-if="isOpen"><slot /></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Arrow from "../assets/arrowhead.svg";

const isOpen = ref(true);
</script>

<style scoped>
.container {
  position: relative;
}

.side-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 10px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  transition: transform 0.3s ease-in-out;
}
.side-panel.open {
  width: 300px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
.arrow {
  width: 20px;
  height: 20px;
}
</style>
