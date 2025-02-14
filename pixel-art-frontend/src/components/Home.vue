<template>
  <div class="container">
    <canvas id="canvas" ref="canvasRef"></canvas>
    <button @click="startMosaic">Generate Mosaic</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getPhotos } from "../actions/index";

const canvasRef = ref(null);
const imgSrc = "@/assets/woman2.jpg";
const TILE_SIZE = 10; // size of mosaic tiles (10px x 10px)

// Convert RGB to HEX
function rgbToHex(rgb) {
  return (
    "#" +
    rgb
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

// Compute the closest color from Unsplash API predefined colors
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

// Fetch images from Unsplash
async function fetchImage(color) {
  const photos = await getPhotos("nature", color);
  if (photos.length > 0) {
    return photos[Math.floor(Math.random() * photos.length)].urls.small;
  }
  return null;
}

// Generate Mosaic when button is clicked
async function startMosaic() {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = imgSrc;
  img.crossOrigin = "anonymous";

  img.onload = async () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Iterate through the image in TILE_SIZE increments
    for (let y = 0; y < img.height; y += TILE_SIZE) {
      for (let x = 0; x < img.width; x += TILE_SIZE) {
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const [r, g, b] = pixelData;
        const colorName = closestColor(r, g, b);
        const imageUrl = await fetchImage(colorName);

        if (imageUrl) {
          const tileImg = new Image();
          tileImg.src = imageUrl;
          tileImg.crossOrigin = "anonymous";

          // Wait for image to load before drawing
          await new Promise((resolve) => {
            tileImg.onload = () => {
              ctx.drawImage(tileImg, x, y, TILE_SIZE, TILE_SIZE);
              resolve();
            };
          });
        }
      }
    }
  };
}

onMounted(() => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = imgSrc;
  img.crossOrigin = "anonymous";

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };
});
</script>

<style scoped>
#canvas {
  width: 600px;
  height: auto;
}
</style>
