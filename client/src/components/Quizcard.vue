<template>
  <div>
    <b-card>
      <p>{{ question }}</p>
      <br />
      <p>{{ answer }}</p>
      <div class="editQuestion">
        <b-icon
          icon="trash-fill"
          style="margin-left: 15px"
          v-on:click="deleteQuizQuestion"
        >
        </b-icon>
        <b-icon icon="pencil-fill" v-b-toggle="'editQuestion-' + index">
        </b-icon>
      </div>
      <div>
        <b-collapse v-bind:id="'editQuestion-' + index">
          <b-form>
            <b-form-input placeholder="Edit Question" v-model="newQuestion">
            </b-form-input>
            <b-form-input placeholder="Edit Answer" v-model="newAnswer">
            </b-form-input>
            <b-button
              variant="primary"
              v-on:click="editQuizQuestion"
            >
              Save
            </b-button>
            <b-button v-b-toggle="'editQuestion-' + index"> Cancel </b-button>
          </b-form>
        </b-collapse>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Quizcard",
  props: ["index", "id", "question", "answer"],
  data: function () {
    return {
      newQuestion: "",
      newAnswer: "",
    };
  },
  methods: {
    editQuizQuestion: function () {
      this.$emit('editQuestion', this.id, {
        question: this.newQuestion,
        answer: this.newAnswer
      })
    },
    deleteQuizQuestion: function() {
      this.$emit('deleteQuestion', this.id);
    }
  }
};
</script>

<style>
.editQuestion {
  display: flex;
  flex-direction: row-reverse;
}
</style>