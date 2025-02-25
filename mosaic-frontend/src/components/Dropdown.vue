<template>
  <div ref="dropdownRef" class="dropdown">
    <div class="title">{{ title }}</div>
    <div
      ref="dropdownButtonRef"
      class="dropdown-button"
      @click="toggleDropdown"
    >
      {{
        selectedOption
          ? selected.label
          : placeholder !== undefined
          ? placeholder
          : "Select an option"
      }}
    </div>

    <ul
      class="dropdown-list"
      v-if="isOpen"
      :style="{ width: dropdownWidth + 'px' }"
    >
      <li
        :class="[
          'dropdown-option',
          { selected: selected.label === option.label },
        ]"
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
import { ref, defineProps, defineEmits, onMounted, nextTick } from "vue";

const props = defineProps({
  options: Array,
  title: String,
  placeholder: String,
  selectedOption: [String, Number],
});

const emit = defineEmits(["change"]);

const isOpen = ref(false);
const dropdownWidth = ref(0);
const selected = ref(
  props.options.find((option) => option.value === props.selectedOption)
);
const dropdownRef = ref(null);
const dropdownButtonRef = ref(null);

const toggleDropdown = async () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    await nextTick();
    updateDropdownWidth();
  }
};

const selectOption = (option) => {
  selected.value = option;
  isOpen.value = false;
  emit("change", option.value);
};

const updateDropdownWidth = () => {
  if (dropdownButtonRef.value) {
    dropdownWidth.value = dropdownButtonRef.value.offsetWidth;
  }
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  updateDropdownWidth();
  document.addEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.dropdown {
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

.dropdown-button {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  width: 90%;
}

.title {
  font-weight: bold;
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  list-style: none;
  padding: 10px;
  margin: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1;
}

.dropdown-list li {
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
}

.dropdown-list li:hover {
  background-color: #d9c4ef;
}

.dropdown-list li.selected {
  background: #c99ef6;
}
</style>
