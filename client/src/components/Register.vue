<template>
  <!-- REGISTER SECTION -->

  <section id="registerSection">
    <h2>REGISTER FORM</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="emailRegist"
          aria-describedby="emailHelp"
          v-model="emailRegister"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="passwordRegist"
          v-model="passwordRegister"
        />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      emailRegister: "",
      passwordRegister: "",
    };
  },
  methods: {
    registerUser() {
      axios
        .post("http://localhost:3000/register", {
          email: this.emailRegister,
          password: this.passwordRegister,
        })
        .then((response) => {
          console.log(response.data);
          this.emailRegister = "";
          this.passwordRegister = "";
        })
        .catch((error) => {
          // console.log(error.response.data.message);
        });
    },
  },
};
</script>
