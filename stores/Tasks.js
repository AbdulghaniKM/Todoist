import { defineStore } from 'pinia'
export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [
    ]
  }),
  actions: {
    addTask(task) {
      this.tasks.push(task)
    },
    removeTask(index) {
      this.tasks.splice(index, 1)
    },
    updateTask(index, updatedTask) {
      this.tasks[index] = updatedTask
    },
    doneTask(index) {
      this.tasks[index].done = !this.tasks[index].done
    }
  },
  getters: {
    getTasks: (state) => state.tasks,
  }
})
