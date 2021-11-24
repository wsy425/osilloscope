<template>
  <div>
    <HelloWorld />
    <WebSocket />
    <!-- <Excel /> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "./components/HelloWorld.vue";
import WebSocket from "./components/WebSocket.vue";
import Excel from "./components/Excel.vue";

@Options({
  components: {
    HelloWorld,
    WebSocket,
    Excel,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
