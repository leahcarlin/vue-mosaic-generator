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
  width: 20vw;
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
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
}

/* Mobile & Tablet styles */
@media (max-width: 1024px) {
  .side-panel {
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  }

  .side-panel.hidden {
    transform: translateY(100%);
  }
  .side-panel.open {
    width: auto;
    height: 40vh;
  }
  .side-panel .arrow {
    transform: rotate(90deg);
  }
  .side-panel.open .arrow {
    transform: rotate(270deg);
  }
  .close-btn {
    position: fixed;
    top: auto;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
}
</style>
