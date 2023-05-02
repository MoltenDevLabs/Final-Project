<template>
  <div class="subnavbar-wrapper">
    <button class="btn btn-card" @click="handleSignOut()">
      <img class="card-img" src="@/assets/logout.svg" alt="Log out" />
    </button>
    <button class="btn btn-card" @click="() => togglePopup('addTask')">
      <img class="card-img" src="@/assets/add.svg" alt="Add task" />
    </button>
  </div>

  <div>
    <TaskPopup v-if="popupTriggers.addTask" :togglePopup="() => togglePopup('addTask')">
      <form @submit.prevent class="form-wrapper">
        <label class="form-label" for="title">Title</label>
        <input class="form-input" type="text" placeholder="Title" v-model="this.newTaskTitle" />
        <label class="form-label" for="description">Description</label>
        <textarea
          class="form-input"
          type="text"
          placeholder="Add a short description"
          rows="4"
          cols="20"
          v-model="this.newTaskDescription"
        ></textarea>

        <button
          class="btn btn-form"
          @click="
            handleAddNewTask({
              title: this.newTaskTitle,
              description: this.newTaskDescription,
              user_id: user.id
            })
          "
        >
          Add Task
        </button>
      </form>
    </TaskPopup>
  </div>

  <div v-if="taskList.length">
    <ul>
      <li v-for="task in taskList" :key="task.id">
        <TaskCard :task="task" />
      </li>
    </ul>
  </div>
  <h4 v-else class="text-without-tasks">Hi Boss! Start by adding a task!</h4>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import taskStore from '@/stores/tasks'
import userStore from '@/stores/user'
import TaskPopup from './Authentication/Popups/TaskPopup.vue'
import TaskCard from '../components/TaskCard.vue'
import { useToast } from 'vue-toastification'

export default {
  name: 'HomeView',
  data() {
    return {
      newTaskTitle: '',
      newTaskDescription: '',
      is_complete: false,
      popupTriggers: {
        buttonTrigger: false,
        addTask: false,
        updateTask: false
      },
      selectedTask: null,
      toast: useToast()
    }
  },
  components: {
    TaskPopup,
    TaskCard
  },
  computed: {
    ...mapState(taskStore, ['taskList']),
    ...mapState(userStore, ['user'])
  },
  methods: {
    ...mapActions(taskStore, ['addNewTask', 'fetchAllTasks', 'updateTask', 'deleteTask']),
    ...mapActions(userStore, ['signOut']),

    togglePopup(trigger, task = null) {
      this.popupTriggers[trigger] = !this.popupTriggers[trigger]
      if (task) {
        this.selectedTask = task
      }
    },

    async handleSignOut() {
      try {
        await this.signOut()
        this.toast.success('Bye Boss')
        this.$router.push({ name: 'sign-in' })
      } catch (error) {
        this.toast.error("Couldn't sign out")
        console.error(error)
      }
    },

    async handleAddNewTask(task) {
      if (task.title.length < 4) {
        this.toast.error('Title must be at least 4 characters')
        throw new Error('Title must be at least 4 characters')
      }
      await this.addNewTask(task)
      this.toast.success('Task added')
      this.newTaskTitle = ''
      this.newTaskDescription = ''
      this.togglePopup('addTask')
    },

    created() {
      this.fetchAllTasks()
    }
  }
}
</script>

<style scoped>
.subnavbar-wrapper {
  display: flex;
  flex-direction: row-reverse;
  margin: 0 1.5vh;
}
ul {
  list-style: none;
  padding: 1vh;
}
li {
  margin: 1vh 0;
}
.text-without-tasks {
  align-items: center;
  display: flex;
  margin: 4vh;
  justify-content: center;
  border: 8px solid #522b58;
  border-radius: 12px;
}
</style>
