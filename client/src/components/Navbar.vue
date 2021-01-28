<template>
  <div>
    <b-navbar id="siteNavbar">
      <b-navbar-nav>
        <b-nav-item href="/">
          <div class="navbarItem">
            Home
          </div>
        </b-nav-item>
        <b-nav-item href="/about">
          <div class="navbarItem">
            About
          </div>
        </b-nav-item>
        <b-nav-item v-on:click="toggleSearch"
          style="width: 50px"
        >
          <div class="navbarItem">
            <b-icon icon="search">
            </b-icon>
          </div>
        </b-nav-item>
        <div class="navbarItem"
          id="searchBar"
          v-if="this.searchMode"
        >
          <input type="text"
            class="input-group-text"
            placeholder="Find a Quiz"
          >
          <b-button>Search</b-button>
        </div>
        <b-nav-item>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
//import { log } from "@/config/config";

export default {
  name: "Navbar",
  data() {
    return {
      searchMode: false,
    };
  },
  methods: {
    toggleSearch: function() {
      this.searchMode = ! this.searchMode;
    }
  }
};
</script>

<style>
#siteNavbar {
  background-color: mediumpurple;
  height: 60px;
  margin-bottom: 20px;
}
.navbarItem {
  width: 80px;
  text-align: left;
  padding-left: 10px;
  color: black;
}

#searchBar {
  margin: auto;
  display:flex;
  flex-direction: row;
}

</style>