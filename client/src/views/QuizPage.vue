<template>
  <div id="mainDiv">
    <h3> {{ this.quizName }} </h3>
  </div>
</template>

<script>
import axios from 'axios';
import { url } from '@/config/config';

export default {
  name: 'QuizPage',
  components: {
  },
  created() {
    console.log("Created");
    axios.get(url('client'), {
    })
      .then( (res) => {
        console.log(res);
      })
      .catch( (err) => {
        console.log("error");
        console.log(err);
      })
  },
  data() {
    return {
      quizName: "Quiz Name"
    }
  }
}
</script>