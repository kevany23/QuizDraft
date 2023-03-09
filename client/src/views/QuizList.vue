<template>
  <div>
    <h3>List of Quizzes</h3>
    <div v-for="quiz in  quizList" :key="quiz._id"
      class = "quizLink"
    >
      <a v-bind:href="'quiz/' + quiz._id">
        <h5>{{quiz.name}}</h5>
        <h6>{{quiz.subject}}</h6>
      </a>
    </div>
    <div v-if="isLoading" style="margin-top: 20px">
      <b-spinner variant="primary" label="Spinning">
      </b-spinner>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { url, log } from '@/config/config'

export default {
  name: "QuizList",
  created() {
    this.isLoading = true;
    axios.get(url('quizList'), {
      headers:{
        "Access-Control-Allow-Origin": "*"
    }})
    .then((res) => {
      this.quizList = res.data;
      this.isLoading = false;
    })
    .catch(() => {
      log("Error");
      this.isLoading = false;
    })
  },
  data: function() {
    return {
      quizList: [],
      isLoading: true
    }
  }
};
</script>

<style>
.quizLink {
  padding: 10px;
}
</style>