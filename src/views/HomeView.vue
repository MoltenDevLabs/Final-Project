<template>
  <h1>HomeView</h1>
  <button class="btn btn-logout" @click="handleSignOut()">Log out</button>

  <div>
    <button class="btn btn-addtask-home" @click="() => togglePopup('addTask')">Add Task</button>
    <TaskPopup v-if="popupTriggers.addTask" :togglePopup="() => togglePopup('addTask')">
      <label for="title">Title</label>
      <input
        type="text"
        placeholder="Title"
        v-model="this.newTaskTitle"
        @keypress.enter="
          handleAddNewTask({
            title: this.newTaskTitle,
            description: this.newTaskDescription,
            user_id: user.id
          })"
      />
      <label for="description">Description</label>
      <textarea
        type="text"
        placeholder="Add a short description"
        v-model="this.newTaskDescription"
      ></textarea>

      <button
        @click="
          handleAddNewTask({
            title: this.newTaskTitle,
            description: this.newTaskDescription,
            user_id: user.id
          })"
      >
        Add Task
      </button>
    </TaskPopup>
  </div>

  <div v-if="taskList.length">
    <ul>
      <li v-for="task in taskList" :key="task.id">
        <div :class="{'completed-task': task.is_complete}">
          <input type="checkbox" :checked="task.is_complete" @click="handleTaskCompleted(task)">
        </div> 
        <h4>{{ task.title }}</h4>
        <p>{{ task.description }}</p>

        <button class="btn btn-addtask-update" @click="() => togglePopup('updateTask', task)">
          Update Task
        </button>
        <UpdateTaskPopup
          v-if="popupTriggers.updateTask && selectedTask === task"
          :togglePopup="() => togglePopup('updateTask', task)"
          :task="task"
        >
          <label for="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            v-model="task.title"
            @keypress.enter="
              handleUpdateTask({ title: task.title, description: task.description, id: task.id })"
          />
          <label for="description">Description</label>
          <textarea
            type="text"
            placeholder="Add a short description"
            v-model="task.description"
          ></textarea>

          <button
            @click="
              handleUpdateTask({ title: task.title, description: task.description, id: task.id })"
          >
            Update
          </button>
        </UpdateTaskPopup>

        <button class="btn btn-li" @click="deleteTask(task.id)">Delete Task</button>
      </li>
    </ul>
  </div>
  <div v-else>Hi Boss! Start by adding a task!</div>
</template>

<script>
import { ref } from 'vue'
import { mapActions, mapState } from 'pinia'
import taskStore from '../stores/tasks'
import userStore from '@/stores/user'
import TaskPopup from './Authentication/Popups/TaskPopup.vue'
import UpdateTaskPopup from './Authentication/Popups/UpdateTaskPopup.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      newTaskTitle: '',
      newTaskDescription: '',
      is_complete: false
    }
  },
  setup() {
    const popupTriggers = ref({
      buttonTrigger: false,
      addTask: false,
      updateTask: false
    })

    const selectedTask = ref(null)

    const togglePopup = (trigger, task = null) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]
      if (task) {
        selectedTask.value = task
      }
    }

    return {
      TaskPopup,
      UpdateTaskPopup,
      popupTriggers,
      selectedTask,
      togglePopup
    }
  },
  components: {
    TaskPopup,
    UpdateTaskPopup
  },
  computed: {
    ...mapState(taskStore, ['taskList']),
    ...mapState(userStore, ['user'])
  },
  methods: {
    ...mapActions(taskStore, ['addNewTask', 'fetchAllTasks', 'updateTask', 'deleteTask']),
    ...mapActions(userStore, ['signOut']),

    async handleSignOut() {
      try {
        await this.signOut()
        this.$router.push({ name: 'sign-in' })
      } catch (error) {
        console.error(error)
      }
    },

    async handleAddNewTask(task) {
      if (task.title.length < 3) {
        throw new Error ('Title must be at least 3 characters')
      }
      await this.addNewTask(task)
      this.newTaskTitle = ''
      this.newTaskDescription = ''
      this.togglePopup('addTask')
    },

    async handleUpdateTask(task) {
      if (task.title.length < 3) {
        throw new Error ('Title must be at least 3 characters')
      }
      await this.updateTask(task)
      task.title = ''
      task.description = ''
      this.togglePopup('updateTask')
    },

    async handleTaskCompleted(task) {
      task.is_complete = !task.is_complete;
      await this.updateTask({
      id: task.id,
      title: task.title,
      description: task.description,
      is_complete: task.is_complete
      });
    }
  },

  created() {
    this.fetchAllTasks()
  }
}
</script>

<style scoped></style>
