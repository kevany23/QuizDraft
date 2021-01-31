<template>
  <div id="app">
    <div id="nav">
      <!-- Navbar should go here -->
      <Navbar/>
    </div>
    <div id="mainContainer">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  }
}

</script>

<style>
#app {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: lightgray;
}

#mainContainer {
  background-color: white;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 90%;
  margin: auto;
  padding-top: 20px;
  height: 80%;
  padding-bottom: 50px;
}
</style>
