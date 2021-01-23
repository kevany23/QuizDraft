<template>
  <div id="mainDiv">
    <div>
      <h3>Welcome to Quizdraft!</h3>
    </div>
    <div id="formDiv">
      <h4>Create a form:</h4>
      <b-form>
        <label for="name">Quiz Name</label>
        <b-form-input class="formInput" id="name"></b-form-input>
        <label for="subject"> Subject </label>
        <b-form-input class="formInput" id="subject"></b-form-input>
        <b-button type="submit">Create</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { foobar } from '../config/config.js';

export default {
  name: "Home",
  components: {},
  data: function() {
    return {
      foo: foobar
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
}

.formInput {
  margin-bottom: 15px;
}
</style>