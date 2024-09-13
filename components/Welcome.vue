<template>
  <div class="container flex flex-col items-center justify-center gap-4 sm:gap-8 py-6 sm:py-12">
    <h1 class="text-mantis-700 text-3xl sm:text-xl  text-center font-bold leading-tight max-w-3xl">
      Welcome to Todoist: Your Ultimate Task Management Solution
    </h1>
    <p class="text-mantis-600 text-lg sm:text-xl text-center max-w-2xl">
      Streamline your productivity and organize your life with our powerful and intuitive to-do list web app.
    </p>
    <p class="text-mantis-500 text-sm sm:text-base text-center max-w-2xl italic">
      (Psst! Don't worry, our AI overlords promise to use your data responsibly... mostly for world domination plans and cat meme generation.)
    </p>
    <vs-button size="large" sm:size="xl" color="#82bd69" class="mt-2 sm:mt-4 hover:shadow-lg transition-all duration-300">
      <NuxtLink to="/tasks" class="flex flex-row items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3">
        <span class="text-white text-base sm:text-lg font-semibold">Get Started</span>
        <Icon name="solar:arrow-right-bold" class="text-white" size="20" sm:size="24" />
      </NuxtLink>
    </vs-button>
  </div>
</template>