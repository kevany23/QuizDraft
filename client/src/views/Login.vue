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
        let ac = await this.$gAuth.getAuthCode();
        /*const user = await this.$gAuth.signIn();
        let ac = await this.$gAuth.getAuthCode();
        log(user);
        log(user.getBasicProfile());
        log(user.getAuthResponse());*/
        //let ac = user.access_token;
        log(ac);
        let resp = await axios.post(url('login'), {
          code: ac
        });
        Login.setLoginToken(resp.data.access_token);
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