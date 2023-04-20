<template>
  <h1>HomeView</h1>
  <input type="text" v-model="newTaskTitle"/>
  <!--bindear este input con el newTaskTitle, 
    fer un boto per crear tasca que dispari la funcio addNewTask amb el titol de l'input, 
    i el user_id corresponent(es posa automatic???)-->
  <button @click="addNewTask({ title: newTaskTitle, user_id: 'af7c1fe6-d669-414e-b066-e9733f0de7a8' })">New Task</button>
  <p v-for="task in taskList" :key="task.id">{{ task.title }}</p>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import tasks from '../stores/tasks'

export default {
  name: 'HomeView',
  data() {
    return {
      newTaskTitle: ''
    }
  },
  computed: {
    ...mapState(tasks, ['taskList'])
  },
  methods: {
    ...mapActions(tasks, ['addNewTask'])
  }
}
</script>

<style scoped></style>
