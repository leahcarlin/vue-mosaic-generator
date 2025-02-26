<template>
  <div class="container">
    <SidePanel>
      <div class="panel">
        <div class="current">
          <h3>Current image</h3>
          <Dropdown
            :options="tileSizeOptions"
            :selectedOption="tileSize"
            title="Tile size"
            placeholder="Select size"
            @change="updateSettings('size', $event)"
          />
          <Dropdown
            :options="imageThemeOptions"
            :selectedOption="imageTheme"
            title="Image theme"
            placeholder="Select theme"
            @change="updateSettings('theme', $event)"
          />
          <Button @click="generateMosaic" title="Update" type="secondary" />
          <Button
            @click="downloadMosaic"
            title="Download mosaic"
            type="primary"
          />
        </div>
        <div class="new">
          <h3>New</h3>
          <FileUploader
            @selected="generateNewMosaic($event)"
            btnLabel="Upload new image"
          />
        </div>
      </div>
    </SidePanel>
    <canvas id="canvas" ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import SidePanel from "./SidePanel.vue";
import Dropdown from "./Dropdown.vue";
import Button from "./Button.vue";
import FileUploader from "./FileUploader.vue";
import { getPhotos } from "../actions/index";
import { PhotosStore } from "../store/PhotosStore";

const props = defineProps({
  imgSrc: String,
});

const tileSizeOptions = [
  { value: 2, label: "Extra small" },
  { value: 5, label: "Small" },
  { value: 10, label: "Medium" },
  { value: 20, label: "Large" },
];

const imageThemeOptions = [
  { value: "abstract", label: "Abstract" },
  { value: "cartoon", label: "Cartoon" },
  { value: "fashion", label: "Fashion" },
  { value: "food", label: "Food" },
  { value: "nature", label: "Nature" },
  { value: "sports", label: "Sports" },
];

const canvasRef = ref(null);
const imageSrc = ref(props.imgSrc);
const tileSize = ref(5); // size of mosaic tiles (5px x 5px)
const imageTheme = ref("nature");
let photosStore = new PhotosStore();

// update settings
function updateSettings(attribute, event) {
  switch (attribute) {
    case "size":
      tileSize.value = event;
      break;
    case "theme":
      imageTheme.value = event;
      break;
    default:
      break;
  }
}
// compute closest filter color for Unsplash API
function closestColor(r, g, b) {
  const colors = {
    black: { r: 0, g: 0, b: 0 },
    white: { r: 255, g: 255, b: 255 },
    yellow: { r: 255, g: 255, b: 0 },
    orange: { r: 255, g: 165, b: 0 },
    red: { r: 255, g: 0, b: 0 },
    purple: { r: 128, g: 0, b: 128 },
    magenta: { r: 255, g: 0, b: 255 },
    green: { r: 0, g: 255, b: 0 },
    teal: { r: 0, g: 128, b: 128 },
    blue: { r: 0, g: 0, b: 255 },
  };

  let closest = "";
  let smallestDistance = Infinity;

  for (let name in colors) {
    const { r: cr, g: cg, b: cb } = colors[name];
    const distance = Math.sqrt((r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closest = name;
    }
  }
  return closest;
}

// fetch images based on color
async function fetchImage(color) {
  // Check if there are no photos for the theme or color in the store
  const themePhotos = photosStore.themes[imageTheme.value] || {};
  const colorPhotos = themePhotos[color] || [];
  // If no photos for the theme or color, fetch new ones
  if (colorPhotos.length === 0) {
    const photos = await getPhotos(imageTheme.value, color);
    photosStore.addPhotos(imageTheme.value, color, photos);
  }

  // Return one random photo for the theme and color
  return photosStore.getRandomPhoto(imageTheme.value, color);
}

// checking every tileSize and replace each section with a new image
async function processMosaic(ctx, img) {
  for (let y = 0; y < img.height; y += tileSize.value) {
    for (let x = 0; x < img.width; x += tileSize.value) {
      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      const [r, g, b] = pixelData;

      const colorName = closestColor(r, g, b);

      const image = await fetchImage(colorName);

      if (image) {
        const tileImg = new Image();
        tileImg.crossOrigin = "anonymous";
        tileImg.onload = () => {
          ctx.drawImage(tileImg, x, y, tileSize.value, tileSize.value);
        };
        tileImg.src = image.urls.small;
      }
    }
  }
}

const downloadMosaic = () => {
  const link = document.createElement("a");
  link.download = "mosaic-image.png";
  link.href = canvasRef.value.toDataURL("image/png"); // convert canvas to data URL
  link.click();
};

async function generateMosaic() {
  const canvas = canvasRef.value;
  if (!canvas || !imageSrc.value) return;

  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.onload = async () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Now process the mosaic
    await processMosaic(ctx, img);
  };

  img.onerror = (err) => console.error("Failed to load image", err);

  // Ensure proper loading of Base64 images
  img.crossOrigin = "anonymous";
  img.src = imageSrc.value;
}

function generateNewMosaic(imgUrl) {
  imageSrc.value = imgUrl;
  generateMosaic();
}

onMounted(() => {
  generateMosaic();
});
</script>

<style scoped>
.container {
  display: flex;
}
#canvas {
  width: 70vw;
  height: auto;
  overflow: scroll;
}
.panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin: 20px 0;
}
.current {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
