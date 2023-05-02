<template>
  <div class="task-card-wrapper">
    <div class="top-line-card-wrapper">
      <div class="card-title-wrapper">
        <h4 class="task-card-title">{{ task.title }}</h4>
      </div>

      <div class="btn-card-wrapper">
        <label class="checkbox-label" for="checkbox-card"
          ><img class="checkbox-img" src="@/assets/check.svg"
        /></label>
        <input
          :class="{ 'checkbox-card-completed': task.is_complete }"
          id="checkbox-card"
          class="checkbox-card"
          type="checkbox"
          :checked="task.is_complete"
          @click="handleTaskCompleted(task)"
        />
        <button class="btn btn-card" @click="() => togglePopup('updateTask', task)">
          <img class="card-img" src="@/assets/update.svg" alt="Update task" />
        </button>

        <UpdateTaskPopup
          v-if="popupTriggers.updateTask && selectedTask === task"
          :togglePopup="() => togglePopup('updateTask', task)"
          :task="task"
        >
          <form @submit.prevent class="form-wrapper">
            <label class="form-label" for="title">Title</label>
            <input
              class="form-input"
              type="text"
              placeholder="Title"
              v-model="newTaskTitle"
            />
            <label class="form-label" for="description">Description</label>
            <textarea
              class="form-input"
              type="text"
              placeholder="Add a short description"
              rows="4"
              cols="20"
              v-model="newTaskDescription"
            ></textarea>

            <button
              class="btn btn-form"
              @click="
                handleUpdateTask({ title: task.title, description: task.description, id: task.id })
              "
            >
              Update
            </button>
          </form>
        </UpdateTaskPopup>

        <button class="btn btn-card" @click="handleDeleteTask(task)">
          <img class="card-img" src="@/assets/delete.svg" alt="Delete task" />
        </button>
      </div>
    </div>
    <p>{{ task.description }}</p>
  </div>
</template>

<script>
import UpdateTaskPopup from '@/views/Authentication/Popups/UpdateTaskPopup.vue'
import { mapActions, mapState } from 'pinia'
import taskStore from '@/stores/tasks'
import { useToast } from "vue-toastification"

export default {
  name: 'TaskCard',
  data() {
    return {
      newTaskTitle: '',
      newTaskDescription: '',
      is_complete: false,
      popupTriggers: {
        addTask: false,
        updateTask: false
      },
      selectedTask: null,
      toast: useToast()
    }
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  components: {
    UpdateTaskPopup
  },
  computed: {
    ...mapState(taskStore, ['taskList'])
  },
  methods: {
    ...mapActions(taskStore, ['fetchAllTasks', 'updateTask', 'deleteTask']),

    togglePopup(trigger, task = null) {
        this.popupTriggers[trigger] = !this.popupTriggers[trigger]
        if (task) {
            this.newTaskTitle = task.title
            this.newTaskDescription = task.description
            this.selectedTask = task
        }
    },

    async handleUpdateTask(task) {
      if (this.newTaskTitle.length < 4) {
        this.toast.error('Title must be at least 4 characters')
        throw new Error('Title must be at least 4 characters')
      }
      const updatedTask = {
        id: task.id,
        title: this.newTaskTitle,
        description: this.newTaskDescription,
        is_complete: task.is_complete
      }
      await this.updateTask(updatedTask)
      this.toast.success('Task updated')
      this.newTaskTitle = ''
      this.newTaskDescription = ''
      this.togglePopup('updateTask')
    },

    async handleTaskCompleted(task) {
      task.is_complete = !task.is_complete
      await this.updateTask({
        id: task.id,
        title: task.title,
        description: task.description,
        is_complete: task.is_complete
      })
    },

    async handleDeleteTask(task) {
      this.toast.success('Task deleted')
      await this.deleteTask(task.id)
    }
  }
}
</script>

<style>
.task-card-wrapper {
  border: 1px solid black;
  border-radius: 12px;
  width: 66%;
}
.top-line-card-wrapper,
p {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 1vh 1vh 1vh 2vh;
}
.btn-card-wrapper {
  display: flex;
  align-items: center;
}
.btn-card {
  padding: 1vh;
  margin: 0 0.5vh;
}
.card-img {
  width: 18px;
  filter: invert(84%) sepia(20%) saturate(294%) hue-rotate(326deg) brightness(108%) contrast(97%);

  display: flex;
  align-items: center;
}
h4 {
  margin: 0;
}
.checkbox-label {
  width: 0;
  height: 0;
}
.checkbox-img {
  display: block;
  width: 28px;
  position: relative;
  top: -14px;
  right: -4px;
  z-index: 2;
  cursor: pointer;
  filter: invert(84%) sepia(20%) saturate(294%) hue-rotate(326deg) brightness(108%) contrast(97%);
  pointer-events: none;
}

.checkbox-card {
  appearance: unset;
  width: 30px;
  height: 30px;
  border: 1px solid #2b124c;
  border-radius: 12px;
  background-color: #fbe4d8;
  cursor: pointer;
  margin: 0 0.5vh;
  transition: box-shadow 0.2s ease-in-out;
  z-index: 3;
}
.checkbox-card:checked {
  background: linear-gradient(to bottom right, #2b124c, #854f6c);
  transition: box-shadow 0.2s ease-in-out;
  border: none;
  z-index: 1;
}

.checkbox-card:not([disabled]):focus,
.checkbox-card:not([disabled]):hover {
  box-shadow: 0 0 0.25rem rgba(25, 0, 25, 0.5), -0.125rem -0.125rem 1rem rgba(82, 43, 88, 0.5),
    0.125rem 0.125rem 1rem rgba(223, 182, 178, 0.5);
}
.checkbox-card:not([disabled]):focus {
  box-shadow: none;
}
</style>
