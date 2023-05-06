import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export default defineStore('taskStore', {
  state() {
    return {
      taskList: []
    }
  },

  actions: {
    async fetchAllTasks() {
      const { data, error } = await supabase.from('tasks').select()

      if (error) {
        console.error(error)
        return
      }
      this.taskList = data
    },

    async addNewTask({ title, description, user_id }) {
      const { data, error } = await supabase
        .from('tasks')
        .insert({ title, description, user_id })
        .select()

      if (error) {
        console.error(error)
        return
      }
      this.taskList.push(data[0])
      this.newTaskTitle = ''
      this.newTaskDescription = ''
    },

    async updateTask({ title, description, id, is_complete }) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ title, description, is_complete })
        .eq('id', id)
        .select()

      if (error) {
        console.error(error)
        return
      }
      this.taskList = data
      await this.fetchAllTasks()
    },

    async deleteTask(id) {
      const { error } = await supabase.from('tasks').delete().eq('id', id)

      if (error) {
        console.error(error)
        return
      }
      await this.fetchAllTasks()
    }
  }
})
