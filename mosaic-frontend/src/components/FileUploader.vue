<template>
  <div class="uploader" v-if="!selectedFile">
    <label class="file-upload"
      >{{ btnLabel }}
      <input
        v-if="!selectedFile"
        type="file"
        @change="onFileChange"
        accept="image/*"
    /></label>
    <div v-if="previewUrl && !selectedFile" class="preview">
      <img :src="previewUrl" alt="Image preview" />
      <Button
        @click="$emit('selected', previewUrl)"
        title="Create Mosaic"
        type="primary"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";
import Button from "./Button.vue";

const isUploaded = ref(false);
const selectedFile = ref(null);
const previewUrl = ref(null);

defineEmits(["selected"]);
defineProps({
  btnLabel: String,
});

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
</script>

<style scoped>
.uploader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  margin-bottom: 5px;
}
/* file upload */
input[type="file"] {
  display: none;
}
label {
  font-size: 16px;
}

.file-upload {
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
.file-upload:hover {
  -webkit-box-shadow: 0px 0px 53px 15px rgba(163, 89, 247, 0.9);
  -moz-box-shadow: 0px 0px 53px 15px rgba(163, 89, 247, 0.9);
  box-shadow: 0px 0px 53px 15px rgba(163, 89, 247, 0.9);
}
</style>
