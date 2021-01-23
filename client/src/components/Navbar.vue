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
        <b-nav-item>
          <div class="navbarItem">
            <b-icon icon="search"></b-icon>
          </div>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
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

</style>