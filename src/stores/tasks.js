// /store/task.js

import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore('tasks', {
  state() {
    return {
      taskList: []
    }
  },
  actions: {
    async fetchAllTasks() {
      const { data, error } = await supabase
        .from('tasks')
        .select()

      if (error) {
        console.error(error)
        return
      }
      console.log(data)
      this.taskList = data
    },
    async addNewTask({ title, user_id }) {
      const { data, error } = await supabase
        .from('tasks')
        .insert({ title, user_id })
        //.select()

      if (error) {
        console.error(error)
        return
      }
      this.taskList.push(data[0])
    }
    }
  }
);

