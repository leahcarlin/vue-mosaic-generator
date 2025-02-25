<template>
  <div class="container">
    <div class="intro" v-if="!selectedFile">
      <div class="description">
        <h1>Photo Mosaic Generator</h1>
        <p>
          Upload an image and watch it become a photo mosaic before your eyes
        </p>
        <p>Each image will be made up of many smaller images or tiles</p>
      </div>
      <FileUploader @selected="setSelectedImage" btnLabel="Upload image" />
    </div>
    <Mosaic v-else :imgSrc="imgSrc" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Mosaic from "./Mosiac.vue";
import FileUploader from "./FileUploader.vue";

const selectedFile = ref(null);
const imgSrc = ref(null);

const setSelectedImage = (previewUrl) => {
  imgSrc.value = previewUrl;
  selectedFile.value = true;
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
}
.description {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
