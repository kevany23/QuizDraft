<template>
  <div id="mainDiv">
    <div id="titleDiv">
      <h3>{{ this.quizName }}</h3>
      <h6>{{ this.subject }}</h6>
    </div>
    <b-popover target="titleDiv" triggers="hover"
      placement="bottom">
      <b-icon icon="pencil-fill"
        v-on:click="showEditQuiz = ! showEditQuiz"
      >
      </b-icon>
    </b-popover>
    <div v-if="showEditQuiz">
      <b-form>
        <b-form-input
          type="text"
          placeholder="Quiz"
          v-model="editQuizName"
        >
        </b-form-input>
        <b-form-input
          type="text"
          placeholder="Subject"
          v-model="editSubject"
        >
        </b-form-input>
        <b-button variant="primary"
          class="editQuizButton"
          style="margin-right: 15px"
          v-on:click="editQuiz"
        >
        Save
        </b-button>
        <b-button
        class="editQuizButton"
        v-on:click="showEditQuiz = ! showEditQuiz"
        >
        Cancel
        </b-button>
      </b-form>
    </div>
    <div id="modeDiv">
      <b-breadcrumb>
        <b-breadcrumb-item
          v-for="item in displayOptions"
          :key = "item.text"
          :active="!! item.active"
          v-on:click="setMode(item.mode)"
        >
          {{ item.text }}
        </b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <div id="questionDiv">
      <div v-if="mode == 1">
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
      <div v-if="mode == 2">
        <div
          class="questionCard"
          v-for="quizQuestion in this.quizQuestions"
          :key="quizQuestion.id"
        >
          <Flashcard v-bind:question="quizQuestion.question"
            v-bind:answer="quizQuestion.answer"
          />
        </div>
      </div>
      <div v-if="mode == 3">
      </div>
    </div>
    <div>
      <h4>Add Question</h4>
      <div id="addQuestionDiv">
        <b-form>
          <b-form-input
            placeholder="Question"
            style="margin-bottom: 10px"
            v-model="newQuestion"
          >
          </b-form-input>
          <b-form-input
            placeholder="Answer"
            style="margin-bottom: 10px"
            v-model="newAnswer"
          >
          </b-form-input>
          <b-button variant="primary" v-on:click="addQuestion">
            Submit
          </b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { log, url } from "@/config/config";
import Flashcard from "@/components/Flashcard.vue"

/* Serves as 'enum' for display modes */
const mode = {
  study: 1,
  flashcard: 2,
  test: 3,
}

export default {
  name: "QuizPage",
  components: {
    Flashcard
  },
  created() {
    this.quizName = "";
    this.id = this.$route.params.id;
    axios.get(url(`quiz/${this.id}`), {})
      .then((res) => {
        this.quizName = res.data.name;
        this.editQuizName = this.quizName;
        this.id = res.data._id;
        this.subject = res.data.subject;
        this.editSubject = this.subject;
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
      editQuizName: this.quizName,
      editSubject: this.subject,
      questions: [],
      quizQuestions: [],
      mode: mode.study,
      displayOptions: [
        {
          text: "Study",
          active: true,
          mode: mode.study
        },
        {
          text: "Flashcard",
          active: false,
          mode: mode.flashcard
        },
        {
          text: "Test",
          active: false,
          mode: mode.test
        }
      ],
      newQuestion: "",
      newAnswer: "",
      showEditQuiz: false,
    };
  },
  methods: {
    setMode: function(mode) {
      for (let option of this.displayOptions) {
        if (option.mode == mode) {
          option.active = true;
        } else if (option.mode == this.mode) {
          option.active = false;
        }
      }
      this.mode = mode;
      // change display
    },
    addQuestion: function() {
      axios.post(url(`addQuestion/${this.id}`), {
        question: this.newQuestion,
        answer: this.newAnswer
      })
      .then((res) => {
        this.quizQuestions.push(res.data);
      })
      .catch( () => {
        log("Error");
      });
    },
    editQuiz: function() {
      axios.post(url(`editQuiz/${this.id}`), {
        name: this.editQuizName,
        subject: this.editSubject
      })
      .then((res) => {
        this.quizName = res.data.name;
        this.subject = res.data.subject;
      })
      .catch( () => {
        log("Error");
      });
    }
  }
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

#modeDiv {
  margin-top: 20px;
}

#addQuestionDiv {
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 600px;
}

.editQuizButton {
  margin-top: 10px;
  width: 80px;
}
</style>