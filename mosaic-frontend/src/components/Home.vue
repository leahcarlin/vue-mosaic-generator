<template>
  <div class="container">
    <div class="uploader" v-if="!selectedFile">
      <h1>Photo Mosaic Generator</h1>
      <p>Upload an image and watch it become a photo mosaic before your eyes</p>
      <p>Each image will be made up of many smaller images or tiles</p>
      <input
        v-if="!selectedFile"
        type="file"
        @change="onFileChange"
        accept="image/*"
      />
      <div v-if="previewUrl && !selectedFile" class="preview">
        <img :src="previewUrl" alt="Image preview" />
        <Button @click="uploadFile" title="Create Mosaic" />
      </div>
    </div>
    <Mosaic v-if="selectedFile" :imgSrc="previewUrl" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Mosaic from "./Mosiac.vue";
import Button from "./Button.vue";

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
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
}

.preview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 200px;
}

.preview img {
  width: 100%;
  border-radius: 8px;
}
</style>
