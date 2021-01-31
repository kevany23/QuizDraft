<template>
  <div id="mainDiv">
    <h3>About Quizdraft</h3>
    <p>
      A study web-based application that allows you to create practice quizzes
      with questions and answers.
    </p>
    <p>
      Our quizzes have different view modes.
    </p>
    <p>
      Study mode views all the questions and answers and allows for changes
    </p>
    <p>
      Flashcard mode hides all the answers initially.
    </p>
    <p>
      Test Mode hides all the answers so you only see the questions.
    </p>
  </div>
</template>

<script>
export default {
  name: 'About',
  components: {}
}
</script>

<style>
#mainDiv {
  display: flex;
  flex-direction: column;
  margin: auto;
}
</style>