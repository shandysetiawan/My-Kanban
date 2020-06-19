<template>
  <div class="col-sm-6 col-md-4 col-xl-3">
    <div class="card-body" style="background-color: #95e1d3;">
      <h6 class="card-title bg-info text-center text-light">{{ category }}</h6>
      <Task
        v-for="(taskCater, idx) in taskCategory"
        :key="idx"
        :task="taskCater"
        v-on:refresh="toParent"
      ></Task>
    </div>
  </div>
</template>

<script>
import Task from "./Task.vue";

export default {
  name: "Deck",
  components: { Task },
  props: ["category", "taskCategory"],
  methods: {
    toParent() {
      this.$emit("refresh");
    }
  }
};
</script>
