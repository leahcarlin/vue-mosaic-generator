<template>
  <div class="dropdown">
    <div class="title">{{ title }}</div>
    <div class="dropdown-button" @click="toggleDropdown">
      {{
        selectedOption
          ? selectedOption.label
          : placeholder !== undefined
          ? placeholder
          : "Select an option"
      }}
    </div>
    <ul class="dropdown-list" v-if="isOpen">
      <li
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from "vue";

defineProps({
  options: Array,
  title: String,
  placeholder: String,
});

const emit = defineEmits(["change"]);

const isOpen = ref(false);
const selectedOption = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
  emit("change", option.value);
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 150px;
  background-color: #fff;
  z-index: 1;
}

.dropdown-list li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-list li:hover {
  background-color: #eee;
}
</style>
