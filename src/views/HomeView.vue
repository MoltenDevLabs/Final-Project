<template>
  <div id="subnavbar-wrapper" class="subnavbar-wrapper">
    <div class="subnavbar-wrapper-left">
      <button class="btn btn-card btn-clear-tasks" @click="handleClearCompleted()">
        Clear completed tasks
      </button>
    </div>
    <div class="subnavbar-wrapper-right">
      <button class="btn btn-card" @click="() => togglePopup('addTask')">
        <img class="card-img" src="@/assets/add.svg" alt="Add task" />
      </button>
      <div class="logout-wrapper">
        <button class="btn btn-card" @click="handleSignOut()">
          <img class="card-img" src="@/assets/logout.svg" alt="Log out" />
        </button>
      </div>
    </div>
  </div>

  <div>
    <img
      src="@/assets/logo.svg"
      alt=""
      class="logo-logout-hidden"
      :class="logoutApp ? 'logo-logout' : ''"
    />
  </div>

  <div>
    <TaskPopup
      v-if="popupTriggers.addTask"
      :togglePopup="() => togglePopup('addTask')"
      class="zoom-in-popup"
      :class="zoomOutPopup ? 'zoom-out-popup' : ''"
    >
      <form @submit.prevent class="form-wrapper">
        <label class="form-label" for="title">Title</label>
        <input
          :class="[addTitleError ? 'form-error' : '', addTitleValid ? 'form-valid' : '']"
          class="form-input"
          type="text"
          placeholder="Title"
          v-model="this.newTaskTitle"
        />
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

  <div v-if="taskListSorted.length">
      <ul id="wrapper-home">
        <li v-for="task in taskListSorted" :key="task.id">
          <TaskCard
            :task="task"
            :class="[
              slideoutTaskCard === task.id ? 'task-card-out' : '',
              slideinTaskCard === true ? 'task-card-in' : ''
            ]"
            @task-deleted="handleDeleteTask(task)"
          />
        </li>
      </ul>
  </div>
  <h4 v-else class="text-without-tasks">No more tasks!</h4>
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
      addTitleError: false,
      addTitleValid: false,
      slideoutTaskCard: false,
      slideinTaskCard: false,
      zoomOutPopup: false,
      logoutApp: false,
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
    TaskCard,
  },
  computed: {
    ...mapState(taskStore, ['taskList']),
    ...mapState(userStore, ['user']),

    taskListSorted() {
      return [...this.taskList].sort((task1, task2) => {
        if (task1.is_complete !== task2.is_complete) {
          return task1.is_complete ? 1 : -1
        }
        return task1.id - task2.id
      })
    }
  },

  methods: {
    ...mapActions(taskStore, ['addNewTask', 'fetchAllTasks', 'updateTask', 'deleteTask']),
    ...mapActions(userStore, ['signOut']),

    togglePopup(trigger, task = null) {
      this.popupTriggers[trigger] = !this.popupTriggers[trigger]
      this.addTitleError = false
      this.addTitleValid = false
      this.zoomOutPopup = false
      this.slideinTaskCard = false
      if (task) {
        this.selectedTask = task
      }
    },

    async handleDeleteTask(task) {
      this.slideoutTaskCard = task.id
      this.toast.success('Task deleted')
      await this.deleteTask(task.id)
    },

    async handleClearCompleted() {
      for (let task of this.taskList) {
        if (task.is_complete) {
          this.slideoutTaskCard = task.id
          await this.deleteTask(task.id)
        }
      }
      this.toast.success('Tasks deleted')
      this.slideoutTaskCard = false
    },

    async handleSignOut() {
      this.logoutApp = true
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.toast.info('MEOW !!')
        this.$router.push({ name: 'sign-in' })
        this.logoutApp = false
        await this.signOut()
      } catch (error) {
        this.toast.error("Couldn't sign out")
      }
    },

    async handleAddNewTask(task) {
      if (task.title.length < 4) {
        this.addTitleValid = false
        this.addTitleError = true
        this.toast.error('Title must be at least 4 characters')
      } else {
        this.zoomOutPopup = true
        this.slideinTaskCard = true
        await this.addNewTask(task)
        this.toast.success('Task added')
        this.addTitleError = false
        this.addTitleValid = true
        this.newTaskTitle = ''
        this.newTaskDescription = ''
        this.togglePopup('addTask')
      }
    }
  },
  async created() {
    await this.fetchAllTasks()
  }
}
</script>

<style>
.logout-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.subnavbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin: 0 1.5vh;
}
.subnavbar-wrapper-right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.btn-clear-tasks {
  line-height: 3vh;
}
.subnavbar-wrapper-right {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
ul {
  list-style: none;
  padding: 1vh;
  margin: 0;
}
li {
  margin: 1vh 0;
}
.text-without-tasks {
  align-items: center;
  display: flex;
  margin: 4vh;
  justify-content: center;
  border: 6px solid #522b58;
  border-radius: 12px;
}
</style>
