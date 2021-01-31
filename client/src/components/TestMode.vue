<template>
  <div id="testDiv">
    <ol id="testQuestions">
      <li class = "testQuestion" v-for="(quizQuestion, index) in quizQuestions" :key="index">
        {{quizQuestion.question}}
      </li>
    </ol>
  </div>
</template>

<script>

export default {
  name: "TestMode",
  props: ['quizQuestions'],
  data: function() {
    return {
    };
  },
}
</script>

<style>
#testDiv {
  width: 600px;
  background-color: white;
  margin-top: 20px;
  text-align: left;
  padding-bottom: 10px;
}
.testQuestion {
  padding-top: 20px;
  padding-bottom: 20px;
  text-indent: 15px;

}
</style>