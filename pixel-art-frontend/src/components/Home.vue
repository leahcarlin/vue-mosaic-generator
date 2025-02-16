<template>
  <div class="uploader">
    <input
      v-if="!selectedFile && !previewUrl"
      type="file"
      @change="onFileChange"
      accept="image/*"
    />
    <div v-if="previewUrl && !selectedFile" class="preview">
      <img :src="previewUrl" alt="Image preview" />
      <button @click="uploadFile" :disabled="!previewUrl">Create Mosaic</button>
    </div>
    <div v-if="selectedFile"><Mosaic :imgSrc="previewUrl" /></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Mosaic from "./Mosiac.vue";

const isUploaded = ref(false);
const selectedFile = ref(null);
const previewUrl = ref(null);

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewUrl.value = reader.result;
    };
    reader.readAsDataURL(file);
    isUploaded.value = true;
  }
};

const uploadFile = () => {
  selectedFile.value = true;
};
</script>

<style scoped>
.uploader {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.preview img {
  max-width: 200px;
  border-radius: 8px;
}
</style>
