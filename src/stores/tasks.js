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

    async updateTask({ title, description, id, is_complete }) {  //Aixo d'editar la tasca no esta acabat, falta que surti un input quan s'apreti el boto
      const { data, error } = await supabase                      // per poder modificar el titol de la tasca
      .from('tasks')
      .update({ title, description, is_complete })
      .eq('id', id)
      .select()

      if (error) {
        console.error(error)
        return
      }
      this.taskList = data
      await this.fetchAllTasks() // Quan el projecte estigui acabat aixo s'ha de millorar, en comptes de fer un altre fetch,
                                  // s'han de modificar al local sense fetch.
    },

    async deleteTask(id) {
      const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)

      if (error) {
        console.error(error)
        return

      }
      await this.fetchAllTasks() // Quan el projecte estigui acabat aixo s'ha de millorar, en comptes de fer un altre fetch,
                                  // s'han de modificar al local sense fetch.
    }
  }
});
