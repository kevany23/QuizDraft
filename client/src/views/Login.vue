<template>
  <div>
    <h1>Login Page</h1>
    <b-button id="loginButton" v-on:click="handleLogin">
      <img id = "googleLogo" src="@/assets/GoogleLogo.svg" width="20px">
      Sign In With Google
    </b-button>
    <br>
    <b-button v-on:click="showCredentials">Test Credentials</b-button>
    <br>
    <b-button v-on:click="logout"> Log Out </b-button>
  </div>
</template>

<script>
import axios from "axios";
import { url, log } from "@/config/config";

export default {
  name: 'Login',
  components: {
  },
  methods: {
    handleLogin: async function() {
      try {
        /*const user = await this.$gAuth.signIn();
        if (! user) {
          return null;
        }
        log(user)
        log(this.$gAuth.isAuthorized);*/
        let ac = await this.$gAuth.getAuthCode();
        log(ac);
        let result = axios.post(url('login'), {
          code: ac
        });
        log(result);
      } catch (err) {
        log(err);
        return null;
      }
    },
    showCredentials: async function() {
      try {
        let authCode = await this.$gAuth.getAuthCode();
        log(authCode);
      } catch (err) {
        log("Authentication Error:");
        log(err);
      }
    },
    logout: async function() {
      try {
        this.$gAuth.signOut();
        log("Signed Out");
      } catch (err) {
        log("Failed to sign out");
      }
    }
  }
}
</script>

<style>
#googleLogo {
  margin-right: 5px;
}
#loginButton {
  width: 200px;
  height: 50px;
  color: black;
  background-color:lightgray;
  border-style: none;

}
</style>