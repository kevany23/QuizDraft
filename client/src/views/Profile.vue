<template>
  <div>
    <h3>Profile Page </h3>
    <h5> Username </h5>
    <h6>{{username}}</h6>
    <h5> Email </h5>
    <h6>{{email}}</h6>
  </div>
</template>

<script>
import axios from "axios";
import { log, url } from "@/config/config";
import { loginTokenObject } from "@/config/login";
export default {
  name: 'Profile',
  data() {
    return {
      username: "",
      email: "",
    }
  },
  created() {
    axios.post(url('account/profile'), loginTokenObject()).then(
      (res) => {
        this.username = res.data.username;
        this.email = res.data.email;
      }).catch(
        (err) => {
          log(err);
      });
  }
}
</script>