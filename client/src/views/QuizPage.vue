<template>
  <div id="mainDiv">
    <h3>{{ this.quizName }}</h3>
    <h5>{{ this.subject }}</h5>
    <div id="questionDiv">
      <div
        v-for="quizQuestion in this.quizQuestions"
        :key="quizQuestion.id"
        class="questionCard"
      >
        <b-card>
          <p>{{ quizQuestion.question }}</p>
          <br />
          <p>{{ quizQuestion.answer }}</p>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { log, url } from "@/config/config";

export default {
  name: "QuizPage",
  components: {},
  created() {
    this.quizName = "";
    this.id = this.$route.params.id;
    axios
      .get(url(`quiz/${this.id}`), {})
      .then((res) => {
        this.quizName = res.data.name;
        this.id = res.data._id;
        this.subject = res.data.subject;
        axios.get(url(`quizQuestions/${this.id}`)).then(
          (res) => {
            this.quizQuestions = res.data;
          },
          () => {
            throw Error("Quiz Questions not found.");
          }
        );
      })
      .catch((err) => {
        log("error");
        log(err);
      });
  },
  data() {
    return {
      quizName: "",
      id: -1,
      subject: "",
      questions: [],
      quizQuestions: [],
    };
  },
};
</script>

<style>
#questionList {
  list-style-type: none;
  padding-left: 0px;
  width: 800px;
}
#questionDiv {
  background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
  margin-bottom: 50px;
}
.questionCard {
  width: 600px;
  margin-left: 10px;
  margin-right: 10px;
  margin: 20px 80px 0px 80px;
}
</style>