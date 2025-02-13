<template>
  <div class="container" ref="containerRef">
    <canvas id="canvas" style="display: none" ref="canvasRef"></canvas>
    <img
      id="photo"
      src="@/assets/woman2.jpg"
      alt="Sample"
      ref="imgRef"
      crossorigin="anonymous"
    />

    <p>Click anywhere on the image to get the pixel color!</p>
    <div
      id="color-box"
      ref="colorBoxRef"
      style="width: 50px; height: 50px; border: 1px solid #000"
    ></div>
    <p id="hex-code" ref="hexCodeRef">#FFFFFF</p>
    <p></p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// References
const containerRef = ref(null);
const canvasRef = ref(null);
const imgRef = ref(null);
const colorBoxRef = ref(null);
const hexCodeRef = ref(null);
const rgb = ref([]);

// Helper function to convert RGB to HEX
function rgbToHex(rgb) {
  console.log("rgb", rgb);
  return (
    "#" +
    rgb
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

// Calculate the Euclidean distance between two colors
function colorDistance(color1, color2) {
  const rDiff = color1.r - color2.r;
  const gDiff = color1.g - color2.g;
  const bDiff = color1.b - color2.b;

  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

function closestColor() {
  // Define the color palette
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

  let closestColorName = "";
  let smallestDistance = Infinity;

  // Iterate over each predefined color and find the one with the smallest distance
  for (let colorName in colors) {
    const currentColor = colors[colorName];
    const distance = colorDistance(
      { r: rgb.value[0], g: rgb.value[1], b: rgb.value[2] },
      currentColor
    );

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestColorName = colorName;
    }
  }
  console.log(`closestColor: ${closestColorName}`);
  return closestColorName;
}

onMounted(() => {
  const img = imgRef.value;
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  const colorBox = colorBoxRef.value;
  const hexCode = hexCodeRef.value;

  // Draw the image on the canvas once it's loaded
  img.addEventListener("load", () => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
  });

  // Handle click event to get the pixel color
  img.addEventListener("click", (event) => {
    const rect = img.getBoundingClientRect();

    // Calculate the scaling factor between displayed and actual image
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;

    // Adjust the click coordinates based on scaling
    const x = Math.floor((event.clientX - rect.left) * scaleX);
    const y = Math.floor((event.clientY - rect.top) * scaleY);

    // Get the pixel data from the canvas
    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const [r, g, b] = pixelData;
    rgb.value = [r, g, b];

    console.log(`Extracted RGB: (${r}, ${g}, ${b})`);

    // Convert to HEX
    const hexColor = rgbToHex(rgb.value);
    console.log(`HEX Color: ${hexColor}`);

    closestColor();

    colorBox.style.backgroundColor = hexColor;
    hexCode.textContent = hexColor;
  });
});
</script>

<style lang="scss">
#photo {
  width: 600px;
  height: auto;
}
</style>
