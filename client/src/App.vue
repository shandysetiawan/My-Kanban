<template>
  <div>
    <div class="container">
    <Login v-if="!isLogged" v-on:successLogin="loginSuccess"></Login>
    <Register v-if="!isLogged"></Register>


    </div>
<section v-if="isLogged">

  <Navbar v-on:logoutsuccess="logOut"></Navbar>
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
      showModal: false,
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
          console.log(error)
          // console.log(error.response.data.message);
        });
    },
    pushData(){
      this.fetchTask()
    },
    loginSuccess(){
      this.isLogged =true,
      this.fetchTask()
    },
    logOut() {
      this.isLogged=false
    }
  }
};
</script>






 
      //   <!-- BOARD SECTION -->
      //   <section id="boardSection">
      //     <h2>KANBAN BOARD</h2>
      //     <button
      //       type="button"
      //       class="btn btn-primary"
      //       data-toggle="modal"
      //       data-target="#exampleModal"
      //     >
      //       Add Task
      //     </button>
          // <div
          //   class="modal fade"
          //   id="exampleModal"
          //   tabindex="-1"
          //   role="dialog"
          //   aria-labelledby="exampleModalLabel"
          //   aria-hidden="true"
          // >
          //   <div class="modal-dialog">
          //     <div class="modal-content">
          //       <div class="modal-header">
          //         <h5 class="modal-title" id="exampleModalLabel">
          //           Create new task
          //         </h5>
          //         <button
          //           type="button"
          //           class="close"
          //           data-dismiss="modal"
          //           aria-label="Close"
          //         >
          //           <span aria-hidden="true">&times;</span>
          //         </button>
          //       </div>
          //       <div class="modal-body">
          //         <form @submit.prevent="addTask">
          //           <div class="form-group">
          //             <label for="title-task">Title</label>
          //             <input
          //               type="text"
          //               class="form-control"
          //               id="title-task"
          //               aria-describedby="emailHelp"
          //               v-model="titleTask"
          //             />
          //           </div>
          //           <div class="form-group">
          //             <label for="desc-task">Description</label>
          //             <input
          //               type="text"
          //               class="form-control"
          //               id="desc-task"
          //               v-model="descriptionTask"
          //             />
          //           </div>
          //           <div class="form-group">
          //             <label for="desc-task">Category</label>
          //             <select class="form-control" v-model="categoryTask">
          //               <option>---Choose One---</option>
          //               <option value="backlog">Backlog</option>
          //               <option value="todo">Todo</option>
          //               <option value="done">Done</option>
          //               <option value="completed">Completed</option>
          //             </select>
          //           </div>
          //           <button
          //             type="button"
          //             class="btn btn-secondary"
          //             data-dismiss="modal"
          //           >
          //             Cancel
          //           </button>
          //           <button type="submit" class="btn btn-primary data-hide">
          //             Create
          //           </button>
          //         </form>
          //       </div>
          //     </div>
          //   </div>
          // </div>
          // <div class="row flex-row flex-sm-nowrap py-3">
           
      //       <div class="col-sm-6 col-md-4 col-xl-3">
      //         <div class="card-body" style="background-color: #95e1d3;">
      //           <h6 class="card-title bg-info text-center text-light">
      //             TO DO
      //           </h6>
      //           <div class="items">
      //             <div
      //               class="card-body"
      //               style="background-color: #eaffd0; margin-bottom: 15px;"
      //               v-for="task in getTodo"
      //               :key="task.id"
      //             >
      //               <div class="card-title">
      //                 <a href="" class="lead font-weight-light"
      //                   >{{task.title}}</a
      //                 >
      //               </div>
      //               <p>
      //                 {{task.description}}
      //               </p>
      //               <button class="btn btn-primary btn-sm">Edit</button>
      //               <button class="btn btn-info btn-sm">Delete</button>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //       <div class="col-sm-6 col-md-4 col-xl-3">
      //         <div class="card-body" style="background-color: #95e1d3;">
      //           <h6 class="card-title bg-info text-center text-light">
      //             DONE
      //           </h6>
      //           <div class="items">
      //             <div
      //               class="card-body"
      //               style="background-color: #eaffd0; margin-bottom: 15px;"
      //               v-for="task in getDone"
      //               :key="task.id"
      //             >
      //               <div class="card-title">
      //                 <a href="" class="lead font-weight-light"
      //                   >{{task.title}}</a
      //                 >
      //               </div>
      //               <p>
      //                 {{task.description}}
      //               </p>
      //               <button class="btn btn-primary btn-sm">Edit</button>
      //               <button
      //                 class="btn btn-info btn-sm"
      //                 v-on:click="removeTask(task.id)"
      //               >
      //                 Delete
      //               </button>
      //             </div>
      //           </div>
      //         </div>
      //       </div>

      //       <div class="col-sm-6 col-md-4 col-xl-3">
      //         <div class="card-body" style="background-color: #95e1d3;">
      //           <h6 class="card-title bg-info text-center text-light">
      //             COMPLETED
      //           </h6>
      //           <div class="items">
      //             <div
      //               class="card-body"
      //               style="background-color: #eaffd0; margin-bottom: 15px;"
      //               v-for="task in getCompleted"
      //               :key="task.id"
      //             >
      //               <div class="card-title">
      //                 <a href="" class="lead font-weight-light"
      //                   >{{task.title}}</a
      //                 >
      //               </div>
      //               <p>
      //                 {{task.description}}
      //               </p>
      //               <button class="btn btn-primary btn-sm">Edit</button>
      //               <button class="btn btn-info btn-sm">Delete</button>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </section>

      //   <!-- ----------------------------------------------- -->
      // </div>
