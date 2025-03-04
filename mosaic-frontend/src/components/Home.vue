<template>
  <div class="container">
    <div class="github" ref="gitHubRef">
      <a
        target="_blank"
        href="https://github.com/leahcarlin/vue-mosaic-generator"
        ><p>Check out the code</p>
        <img src="../assets/icon_github.png" alt="github"
      /></a>
    </div>
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
import { ref, onMounted } from "vue";
import gsap from "gsap";
import Mosaic from "./Mosiac.vue";
import FileUploader from "./FileUploader.vue";

const selectedFile = ref(null);
const imgSrc = ref(null);
const gitHubRef = ref(null);

const setSelectedImage = (previewUrl) => {
  imgSrc.value = previewUrl;
  selectedFile.value = true;
};

onMounted(() => {
  if (gitHubRef.value) {
    gitHubRef.value.addEventListener("mouseenter", () => {
      gsap.to(gitHubRef.value, {
        y: -10, // move up
        duration: 0.3,
        ease: "power1.out",
        yoyo: true,
        repeat: 5, // bounces once
      });
    });
  }
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
  position: relative;
}
.description {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.github {
  margin: 20px;
  position: fixed;
  right: 0;
  bottom: 0;
  cursor: pointer;
}
a {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.github img {
  width: 30px;
  height: 30px;
}
</style>
