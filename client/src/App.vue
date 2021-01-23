<template>
  <div id="app">
    <div id="nav">
      <!-- Navbar should go here -->
      <Navbar/>
    </div>
    <router-view/>
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
  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
