<template>
  <div>
    <div class="container">
      <div class="row flex-end">
        <button
          id="buttonAdd"
          type="button"
          class="btn btn-success btn-lg"
          @click="showModal = !showModal"
        >
          Add New Task
        </button>
      </div>
    </div>
    ​
    <div class="loadingModal" v-if="showModal">
      <div class="theModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add New Task</h5>
              <button
                type="button"
                class="close"
                @click="showModal = !showModal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addTask">
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
                  <button type="submit" class="btn btn-primary">
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ---------------- -->
</template>

<script>
import axios from "axios";

export default {
  name: "Add",
  data() {
    return {
      titleTask: "",
      descriptionTask: "",
      categoryTask: "",
      showModal: false,
    };
  },
  methods: {
    addTask() {
      axios({
        method: "post",
        url: "https://my-kanban-123.herokuapp.com/task",
        data: {
          title: this.titleTask,
          category: this.categoryTask,
          description: this.descriptionTask,
        },
        headers: { access_token: localStorage.token },
      })
        .then((response) => {
          // console.log(response.data);
          let dataTask = {
            id: response.data.id,
            title: response.data.title,
            category: response.data.category,
          };
          this.showModal = false;
          this.$emit("refresh");
          //   this.task.push(dataTask);
          this.titleTask = "";
          this.descriptionTask = "";
          this.categoryTask = "";
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

#buttonAdd {
  padding-left: 100px;
  padding-right: 100px;
  margin-left: 35%;
}
</style>
