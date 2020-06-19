<template>
  <div class="items space">
    <div
      class="card-body"
      style="background-color: #eaffd0; margin-bottom: 15px;"
    >
      <div class="card-title">
        <a href class="lead font-weight-light">{{ task.title }}</a>
      </div>
      <p>{{ task.description }}</p>

      <button
        type="button"
        class="btn btn-primary btn-sm"
        data-toggle="modal"
        data-target="#exampleModal"
        @click="getOne(task.id)"
        :disabled="buttonDisable"
      >
        Edit
      </button>
      <button
        class="btn btn-info btn-sm"
        @click="showModalDelete = true"
        :disabled="buttonDisable"
      >
        Delete
      </button>
    </div>

    <div class="loadingModal" v-if="showModal">
      <div class="theModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Task</h5>
              <button
                type="button"
                class="close"
                @click="showModal = !showModal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="editTask">
                <div class="form-group">
                  <label for="title-task">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title-task"
                    aria-describedby="emailHelp"
                    v-model="titleTask"
                  />
                </div>
                <div class="form-group">
                  <label for="desc-task">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    id="desc-task"
                    v-model="descriptionTask"
                  />
                </div>
                <div class="form-group">
                  <label for="desc-task">Category</label>
                  <select class="form-control" v-model="categoryTask">
                    <option>---Choose One---</option>
                    <option value="backlog">Backlog</option>
                    <option value="todo">Todo</option>
                    <option value="done">Done</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="showModal = !showModal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="editTask(task.id)"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="loadingModal" v-if="showModalDelete">
      <div class="theModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Delete Confirmation
              </h5>
              <button
                type="button"
                class="close"
                @click="showModalDelete = !showModalDelete"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are you sure want to delete this?
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="showModalDelete = !showModalDelete"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="removeTask(task.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Task",
  data() {
    return {
      titleTask: "",
      descriptionTask: "",
      categoryTask: "",
      showModal: false,
      showModalDelete: false,
      disabledButton: false,
    };
  },
  computed: {
    buttonDisable() {
      if (this.task.UserId != localStorage.idUser) {
        return (this.disabledButton = true);
      }
    },
  },
  props: ["task"],
  methods: {
    removeTask(id) {
      axios({
        method: "delete",
        url: `http://localhost:3000/task/${id}`,
        headers: { access_token: localStorage.token },
      })
        .then((response) => {
          // console.log(response.data);
          this.showModalDelete = false;
          this.$emit("refresh");
        })
        .catch((error) => {
          console.log(error.response.data.message);
          // console.log(error.response);
        });
    },
    editTask(id) {
      axios({
        method: "put",
        url: `http://localhost:3000/task/${id}`,
        data: {
          title: this.titleTask,
          category: this.categoryTask,
          description: this.descriptionTask,
        },
        headers: { access_token: localStorage.token },
      })
        .then((response) => {
          console.log(response.data);
          this.titleTask = "";
          this.descriptionTask = "";
          this.categoryTask = "";
          this.showModal = false;
          this.$emit("refresh");
        })
        .catch((error) => {
          // console.log(error.response.data.message);
          console.log(error.response);
        });
    },
    getOne(id) {
      this.showModal = true;
      axios({
        method: "get",
        url: `http://localhost:3000/task/${id}`,
        headers: { access_token: localStorage.token },
      })
        .then((response) => {
          this.titleTask = response.data.title;

          this.categoryTask = response.data.category;

          this.descriptionTask = response.data.description;
        })
        .catch((error) => {
          // console.log(error.response.data.message);
          console.log(error.response);
        });
    },
  },
};
</script>

<style scoped>
.loadingModal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1072;
  /*display: none;*/
}
​ .theModal {
  position: absolute;
  top: 20%;
  left: 50%;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  width: 100%;
  min-width: 600px;
  max-width: 800px;
  /*background: white;*/
  /*box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);*/
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 1em;
  color: black;
  text-align: center;
}
</style>
