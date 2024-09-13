<template>
  <div class="min-h-screen flex flex-col">
    <vs-navbar color="#3d692c" class="py-2 shadow-md" text-white square center-collapsed>
      <template #left>
        <NuxtLink to="/" class="hidden flex-row items-center gap-2 text-2xl sm:flex">
          <Icon name="solar:bill-list-bold" class="text-[#82bd69]" size="35" />
          <h1 class="text-2xl font-bold">Todoist | To Do List Web App</h1>
        </NuxtLink>
      </template>
      <template>
        <NuxtLink to="/" class="flex flex-row sm:hidden items-center gap-2">
          <Icon name="solar:bill-list-bold" class="text-[#82bd69]" size="35" />
          <h1 class="text-2xl font-bold">
            Todoist | To Do List Web App
          </h1>
        </NuxtLink>
      </template>
    </vs-navbar>
    <main class="flex-grow bg-mantis-50">
      <div class="container mx-auto py-8 mt-16">
        <slot />
      </div>
    </main>
    <footer class="bg-mantis-800 text-white py-4">
      <div class="container mx-auto text-center">
        <p>&copy; 2024 Todoist, all rights stolen.</p>
      </div>
    </footer>
  </div>
</template>
