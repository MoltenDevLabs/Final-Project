<template>
  <h1>HomeView</h1>
  <button @click="handleSignOut()">Log out</button>
  <input type="text" v-model="this.newTaskTitle"/>
  <!--bindear este input con el newTaskTitle, 
    fer un boto per crear tasca que dispari la funcio addNewTask amb el titol de l'input, 
    i el user_id corresponent(es posa automatic???)-->
  <button @click="addNewTask({ title: this.newTaskTitle, user_id: this.user.id })">New Task</button>
  <p v-for="task in taskList" :key="task.id">{{ task.title }}</p>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import taskStore from '../stores/tasks'
import userStore from '@/stores/user'

export default {
  name: 'HomeView',
  data() {
    return {
      newTaskTitle: ''
    }
  },
  computed: {
    ...mapState(taskStore, ['taskList']),
    ...mapState(userStore, ['user'])
  },
  methods: {
    ...mapActions(taskStore, ['addNewTask', 'fetchAllTasks',]),
    ...mapActions(userStore, ['signOut']),
    async handleSignOut() {
        try {
           await this.signOut()
            this.$router.push({ name: 'sign-in' })
        } catch(error) {
            console.error(error)
        }
    },
  },
  created() {
    this.fetchAllTasks()
  }
}
</script>

<style scoped></style>
