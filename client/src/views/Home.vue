<template>
  <div id="mainDiv">
    <div>
      <h3>Welcome to Quizdraft!</h3>
      <p>Please note that backend server may take a minute to boot up.</p>
    </div>
    <div id="formDiv">
      <h4>Create a New Quiz:</h4>
      <b-form>
        <label for="name">Quiz Name</label>
        <b-form-input
          class="formInput"
          id="name"
          v-model="createQuizName"
        >
        </b-form-input>
        <label for="subject"> Subject </label>
        <b-form-input
          class="formInput"
          id="subject"
          v-model="createQuizSubject"
          >
        </b-form-input>
        <b-button v-on:click="createQuiz">Create</b-button>
      </b-form>
    </div>
    <div>
      <a href="/quizlist">Quiz List</a>
    </div>
  </div>
</template>

<script>
import { log, url } from '@/config/config';
import axios from 'axios';

export default {
  name: "Home",
  components: {},
  data: function() {
    return {
      createQuizName: "",
      createQuizSubject: ""
    }
  },
  methods: {
    createQuiz: function() {
      log("createQuiz called");
      axios.post(url('createQuiz'), {
        quizName: this.createQuizName,
        quizSubject: this.createQuizSubject
      })
      .then((res) => {
        log("Success");
        let id = res.data.id;
        log(id);
        this.$router.push(`/quiz/${id}`);
      })
      .catch((err) => {
        log(err);
      })
    }
  }
};
</script>

<style>
#mainDiv {
  display: flex;
  flex-direction: column;
}

#formDiv {
  margin-top: 10px;
  margin-bottom: 20px;
}

.formInput {
  margin-bottom: 15px;
}
</style>