<template>
  <!-- LOGIN SECTION -->
  <section id="loginSection">
    <h2>LOGIN FORM</h2>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="emailLog"
          aria-describedby="emailHelp"
          v-model="emailLogin"
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
          id="passwordLog"
          v-model="passwordLogin"
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <br />
    <p>OR</p>
    <GoogleLogin
      :params="params"
      :renderParams="renderParams"
      :onSuccess="onSuccess"
      :onFailure="onFailure"
    ></GoogleLogin
    ><br />
    <p>Don't have account? Register below</p>
  </section>

  <!-- ----------------------------------------------- -->
</template>

<script>
import axios from "axios";
import GoogleLogin from "vue-google-login";

export default {
  name: "Login",
  components: { GoogleLogin },
  data() {
    return {
      emailLogin: "",
      passwordLogin: "",
      params: {
        client_id:
          "146593526403-6ft09orv28779ebcdhso77to554ltsdb.apps.googleusercontent.com",
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    };
  },
  methods: {
    loginUser() {
      axios
        .post("http://localhost:3000/login", {
          email: this.emailLogin,
          password: this.passwordLogin,
        })
        .then((response) => {
          // console.log(response.data);
          // console.log('can logged?')
          this.isLogged = true;

          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("idUser", response.data.idUser);
          localStorage.setItem("emailUser", response.data.emailUser);

          this.emailLogin = "";
          this.passwordLogin = "";
          this.$emit("successLogin");
        })
        .catch((error) => {
          // console.log(error.response.data.message);
        });
    },
    onSuccess(googleUser) {
      let id_token = googleUser.getAuthResponse().id_token;
      // console.log("hit kah");
      // console.log(id_token);
      axios({
        method: "post",
        url: `http://localhost:3000/googleSign`,
        data: { id_token },
      })
        .then((response) => {
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("idUser", response.data.idUser);
          localStorage.setItem("emailUser", response.data.emailUser);
          this.$emit("successLogin");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    onFailure() {},
  },
};
</script>
<style scoped>
p,
label {
  font-size: 16px;
}
</style>
