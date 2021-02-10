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
            v-on:keyup.enter="/*$router.push('/search?query=' + query)*/"
            v-model="query"
          >
          <a v-bind:href="'/search?query=' + query">
            <b-button>Search</b-button>
          </a>
        </div>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/login" v-if="!isLoggedIn">
          <div class="navbarItem">
              Log In
          </div>
        </b-nav-item>
        <b-nav-item v-else v-on:click="logout">
          <div class="navbarItem">
            Log Out
          </div>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import * as Login from "@/config/login";

export default {
  name: "Navbar",
  data() {
    return {
      searchMode: false,
      query: "",
      isLoggedIn: false,
    };
  },
  created() {
    if (Login.isLoggedIn()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  },
  methods: {
    toggleSearch: function() {
      this.searchMode = ! this.searchMode;
    },
    logout: async function() {
      Login.clearLogin();
      this.isLoggedIn = false;
      await this.$gAuth.signOut()
      location.reload();
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