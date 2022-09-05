<script setup lang="ts">
const url = useStrapiUrl()
const adminPanelUrl = url.replace('/api', '/admin')
const version = useStrapiVersion()

const user = useStrapiUser()
const { logout } = useStrapiAuth()
</script>

<template>
  <div>
    <Logos mb-6 />
    <div text-gray:80>
      <span font-500 text-gray>A Template(Vite + Vue + Strapi) inspired by Vitesse.</span>
    </div>
    <div mt-4>
      <h1 font-montserrat text-xl my-2>
        User Info
        <button v-if="user" p-1 text-gray-8 bg-gray-2 text-sm rounded @click="logout">
          logout
        </button>
      </h1>
      <div flex flex-col items-center font-500 text-gray>
        <div v-if="!user">
          You're not logged in yet, go <NuxtLink to="/login" text-primary-500 hover:underline>
            login
          </NuxtLink>
        </div>
        <div v-if="user">
          <p flex>
            <label w-20 text-right>Email:</label>
            <span w-40>{{ user.email }}</span>
          </p>
          <p flex>
            <label w-20 text-right>Username:</label>
            <span w-40>{{ user.username }}</span>
          </p>
          <p flex>
            <label w-20 text-right>Provider:</label>
            <span w-40>{{ user.provider }}</span>
          </p>
          <p flex>
            <label w-20 text-right>Role:</label>
            <span w-40>{{ user.role?.name ?? '' }}</span>
          </p>
        </div>
      </div>
    </div>
    <div mt-4>
      <h1 font-montserrat text-xl my-2>
        Strapi Admin Info
      </h1>
      <div flex flex-col items-center font-500 text-gray>
        <p flex>
          <label w-20 text-right>Email:</label>
          <span w-40>vitesst@strapi.io</span>
        </p>
        <p flex>
          <label w-20 text-right>Password:</label>
          <span w-40>Aa123456</span>
        </p>
        <p flex>
          <label w-20 text-right>Version:</label>
          <span w-40>{{ version }}</span>
        </p>
      </div>
    </div>

    <div m-4>
      <h1 font-montserrat text-xl my-2>
        You can ...
      </h1>
      <div flex justify-center items-center gap-4>
        <a href="https://docs.strapi.io/" target="_blank" btn>
          strapi document
        </a>
        <a :href="adminPanelUrl" target="_blank" btn>
          admin panel
        </a>
        <NuxtLink to="/todo-list" btn>
          todo-list
        </NuxtLink>
      </div>
    </div>
    <Suspense>
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
  </div>
</template>
