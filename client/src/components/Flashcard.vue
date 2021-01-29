<template>
  <div class = "flashcard">
    <div v-on:click="showAnswer = !showAnswer">
      <b-card>
        {{ question}}
      </b-card>
    </div>
    <div v-if="showAnswer">
      <b-card>
        {{  answer  }}
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Flashcard",
  props: ['question', 'answer'],
  data: function() {
    return {
      showAnswer: false
    }
  }
}
</script>

<style>
.flashcard {
  background-color: white;
}
</style>