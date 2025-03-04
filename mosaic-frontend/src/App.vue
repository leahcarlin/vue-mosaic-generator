<template>
  <Home />
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

p,
h1 {
  margin: 0;
}

body {
  margin: 40px 0;
}

body,
div {
  font-family: "Anonymous Pro", serif;
  font-weight: 400;
  font-style: normal;
}

h1,
h3,
label,
button {
  font-family: "Doto", serif;
  font-optical-sizing: auto;
  font-weight: regular;
  font-style: normal;
  font-variation-settings: "ROND" 0;
}
a {
  all: unset;
}
</style>
