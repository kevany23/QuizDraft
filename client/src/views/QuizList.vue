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
  </div>
</template>

<script>
import axios from 'axios';
import { url, log } from '@/config/config'

export default {
  name: "QuizList",
  created() {
    axios.get(url('quizList'))
    .then((res) => {
      this.quizList = res.data;
    })
    .catch(() => {
      log("Error");
    })
  },
  data: function() {
    return {
      quizList: []
    }
  }
};
</script>

<style>
.quizLink {
  padding: 10px;
}
</style>