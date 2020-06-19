<template>
  <div>
    <div class="container">
    <Login v-if="!isLogged" v-on:successLogin="loginSuccess"></Login>
    <Register v-if="!isLogged"></Register>


    </div>
<section v-if="isLogged">

  <Navbar v-on:logoutsuccess="logOut" :emails="userEmail"></Navbar>
    <Add v-on:refresh="pushData"></Add>
    <div class="row flex-row flex-sm-nowrap py-3">
      <Deck category="Backlog" :taskCategory="getBacklog" v-on:refresh="pushData"></Deck>
      <Deck category="Todo" :taskCategory="getTodo" v-on:refresh="pushData"></Deck>
      <Deck category="Done" :taskCategory="getDone" v-on:refresh="pushData"></Deck>
      <Deck category="Completed" :taskCategory="getCompleted" v-on:refresh="pushData"></Deck>
    </div>
  

</section>

</template>
<script>
import axios from "axios";
import Deck from "./components/Deck.vue";
import Task from "./components/Task.vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import Navbar from "./components/Navbar.vue";
import Add from "./components/Add.vue";


export default {
  name: "App",
  components: { Deck, Task, Register,Login,Navbar,Add },
  data() {
    return {
      tasks: [],
      isLogged: false,
      userEmail:""
    };
  },
  created() {
    if (localStorage.token) {
      this.isLogged = true;
      this.fetchTask();
    }
 
  },
  computed: {
    getBacklog() {
      return this.tasks.filter(task => task.category === "backlog");
    },
    getDone() {
      return this.tasks.filter(task => task.category === "done");
    },
    getCompleted() {
      return this.tasks.filter(task => task.category === "completed");
    },
    getTodo() {
      return this.tasks.filter(task => task.category === "todo");
    }
  },
  methods: {

    fetchTask() {
      axios({
        method: "get",
        url: "http://localhost:3000/task",
        headers: { access_token: localStorage.token }
      })
        .then(response => {
          // console.log(response.data.data);
          this.tasks = response.data;
        })
        .catch(error => {
          // console.log(error)
          // console.log(error.response.data.message);
        });
    },
    pushData(){
      this.fetchTask()
    },
    loginSuccess(){
      this.isLogged =true,
      this.fetchTask()
      this.userEmail=localStorage.emailUser
    },
    logOut() {
      this.isLogged=false
      this.userEmail=""
    }
  }
};
</script>