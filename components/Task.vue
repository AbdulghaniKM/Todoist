<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <input v-model="newTask.title" placeholder="Task title" class="w-full mb-4 text-lg p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
      <textarea v-model="newTask.description" placeholder="Task description" class="w-full mb-4 text-base p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"></textarea>
      <button @click="addTask" class="w-full text-lg font-semibold bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-4 rounded-md hover:from-green-500 hover:to-green-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
        <Icon icon="bx:plus" class="w-6 h-6 mr-2" />
        Add Task
      </button>
    </div>

    <transition-group name="list" tag="div" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="(task, index) in tasks"
        :key="task.id"
        class="w-full bg-white rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out hover:shadow-xl transform hover:-translate-y-1 flex flex-col h-full"
        :class="{ 'opacity-60 bg-gray-100': task.done, 'shadow-lg': !task.done }"
      >
        <div class="flex justify-between items-start mb-4">
          <h3 :class="{ 'line-through text-gray-500': task.done, 'font-semibold text-xl text-green-700': !task.done }" class="transition-all duration-300 break-words pr-2 flex-grow">
            {{ task.title }}
          </h3>
          <div class="flex space-x-2 flex-shrink-0">
            <button @click="removeTask(index)" class="p-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-md hover:from-red-500 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg">
              <Icon icon="bx:trash" class="w-5 h-5" />
            </button>
            <button @click="doneTask(index)" :class="task.done ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700' : 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700'" class="p-2 text-white rounded-md transition-all duration-300 shadow-md hover:shadow-lg">
              <Icon :icon="task.done ? 'bx:undo' : 'bx:check'" class="w-5 h-5" />
            </button>
            <button @click="openEditModal(index)" :disabled="task.done" class="p-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md hover:from-blue-500 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg">
              <Icon icon="bx:edit" class="w-5 h-5" />
            </button>
          </div>
        </div>
        <p :class="{ 'line-through text-gray-500': task.done, 'text-gray-700': !task.done }" class="text-base transition-all duration-300 flex-grow">
          {{ task.description }}
        </p>
      </div>
    </transition-group>

    <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 ease-in-out">
        <h3 class="text-2xl font-bold text-green-700 mb-4">Edit Task</h3>
        <input v-model="editedTask.title" placeholder="Title" class="w-full mb-4 text-lg p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
        <textarea v-model="editedTask.description" placeholder="Description" class="w-full mb-4 text-base p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"></textarea>
        <div class="flex justify-end space-x-2">
          <button @click="closeEditModal" class="px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-md hover:from-gray-300 hover:to-gray-400 transition-all duration-300 shadow-md hover:shadow-lg">Cancel</button>
          <button @click="saveEditedTask" class="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useTasksStore } from '../stores/Tasks';
import { Icon } from '@iconify/vue';

const TaskStore = useTasksStore();
const tasks = computed(() => TaskStore.getTasks);

const isEditModalOpen = ref(false);
const editedTask = ref({});
const editedTaskIndex = ref(-1);
const newTask = ref({ title: '', description: '' });

const addTask = () => {
  if (newTask.value.title.trim()) {
    TaskStore.addTask({
      id: Date.now(),
      title: newTask.value.title,
      description: newTask.value.description,
      done: false
    });
    newTask.value = { title: '', description: '' };
    saveToLocalStorage();
  }
};

const removeTask = (index) => {
  TaskStore.removeTask(index);
  saveToLocalStorage();
};

const doneTask = (index) => {
  TaskStore.doneTask(index);
  saveToLocalStorage();
};

const openEditModal = (index) => {
  editedTaskIndex.value = index;
  editedTask.value = { ...tasks.value[index] };
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  editedTask.value = {};
  editedTaskIndex.value = -1;
};

const saveEditedTask = () => {
  if (editedTaskIndex.value !== -1) {
    TaskStore.updateTask(editedTaskIndex.value, editedTask.value);
    closeEditModal();
    saveToLocalStorage();
  }
};

const saveToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
};

const loadFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    TaskStore.$patch({ tasks: JSON.parse(savedTasks) });
  }
};

onMounted(async () => {
  await nextTick();
  loadFromLocalStorage();
});

watch(tasks, () => {
  saveToLocalStorage();
}, { deep: true });
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

button {
  transition: all 0.3s ease;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.bg-white {
  transition: all 0.3s ease;
}

.bg-white:hover {
  transform: translateY(-5px);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fixed {
  animation: fadeIn 0.3s ease-in-out;
}
</style>
