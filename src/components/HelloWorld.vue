<template>
  <div class="container" ref="containerRef">
    <canvas id="canvas" style="display: none" ref="canvasRef"></canvas>
    <img id="photo" src="@/assets/woman.png" alt="Sample" ref="imgRef" />

    <p>Click anywhere on the image to get the pixel color!</p>
    <div
      id="color-box"
      ref="colorBoxRef"
      style="width: 50px; height: 50px; border: 1px solid #000"
    ></div>
    <p id="hex-code" ref="hexCodeRef">#FFFFFF</p>
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

// Helper function to convert RGB to HEX
function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

onMounted(() => {
  const img = imgRef.value;
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  const colorBox = colorBoxRef.value;
  const hexCode = hexCodeRef.value;

  // Draw the image on the canvas once it's loaded
  img.addEventListener("load", () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  });

  // Handle click event to get the pixel color
  img.addEventListener("click", (event) => {
    const rect = img.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const [r, g, b] = pixelData;

    const hexColor = rgbToHex(r, g, b);
    console.log(`HEX Color: ${hexColor}`);

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
