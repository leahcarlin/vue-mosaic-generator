<template>
  <div class="container">
    <canvas id="canvas" ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getPhotos } from "../actions/index";
import { PhotosStore } from "../store/PhotosStore";
import imgFile from "@/assets/woman2.jpg";

const canvasRef = ref(null);
const imgSrc = imgFile;
const tileSize = 5; // size of mosaic tiles (5px x 5px)
const photosStore = new PhotosStore();
window.store = photosStore;

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
  // if no photos for color stored, get photos first
  if (!photosStore[color].length) {
    const photos = await getPhotos("nature", color);
    photosStore.addPhotos(color, photos);
  }
  // return one random photo
  return photosStore.getRandomPhotoByColor(color);
}

// checking every 5px and replace each section with a new 5x5 image
async function processMosaic(ctx, img) {
  for (let y = 0; y < img.height; y += tileSize) {
    for (let x = 0; x < img.width; x += tileSize) {
      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      const [r, g, b] = pixelData;

      const colorName = closestColor(r, g, b);

      const image = await fetchImage(colorName);

      if (image) {
        const tileImg = new Image();
        tileImg.crossOrigin = "anonymous";
        tileImg.onload = () => {
          ctx.drawImage(tileImg, x, y, tileSize, tileSize);
        };
        tileImg.src = image.urls.small;
      }
    }
  }
}

async function generateMosaic() {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = imgSrc;
  img.crossOrigin = "anonymous";

  img.onload = async () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // process pixels after loading
    await processMosaic(ctx, img);
  };
}

onMounted(() => {
  generateMosaic();
});
</script>

<style scoped>
#canvas {
  width: 800px;
  height: auto;
}
</style>
