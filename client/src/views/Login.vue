<template>
  <div>
    <h3>QuizDraft Login</h3>
    <br>
    <b-button id="loginButton" v-on:click="handleLogin">
      <img id = "googleLogo" src="@/assets/GoogleLogo.svg" width="20px">
      Sign In With Google
    </b-button>
    <br>
    <b-button v-on:click="testLogin">Test Login</b-button>
  </div>
</template>

<script>
import axios from "axios";
import { url, log } from "@/config/config";
import * as Login from "@/config/login";

export default {
  name: 'Login',
  components: {
  },
  created() {
    if (Login.isLoggedIn()) {
      //this.$router.push('/');
    }
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
        let resp = await axios.post(url('login'), {
          code: ac
        });
        Login.setLoginToken(resp.data.id_token);
        location.reload();
      } catch (err) {
        log(err);
        return null;
      }
    },
    testLogin: function () {
      axios.post(url('testLogin'),
        {
          ...Login.loginTokenObject()
        })
        .then((res) => {
          log(res.data);
        })
        .catch(() => {})
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