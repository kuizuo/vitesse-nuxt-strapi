<script setup lang="ts">
const router = useRouter()
const form = $ref({
  email: 'vitesse',
  password: '123456',
})

const { login, getProviderAuthenticationUrl } = useStrapiAuth()

async function goLogin() {
  try {
    await login({ identifier: form.email, password: form.password })

    router.push('/')
  }
  catch (e) {
    alert(e.error.message)
  }
}

async function loginWithGithub() {
  window.location = getProviderAuthenticationUrl('github') as unknown as Location
}
</script>

<template>
  <div font-sans w="250px" m-auto>
    <h2 font-bold font-montserrat text-3xl mb-6>
      Login
    </h2>
    <form autocomplete="off">
      <div flex="~ col" justify-center items-center>
        <div m="y-2">
          <h2 text-left font-bold mb-4 font-montserrat>
            Username or Email
          </h2>
          <input
            v-model="form.email" placeholder="vitesse or vitesse@xxx.com" type="text" autocomplete="off"
            p="x-4 y-2" w="250px" text="center" bg="transparent" border="~ rounded gray-200 dark:gray-700"
            outline="none active:none"
          >
        </div>
        <div m="y-2">
          <h2 text-left font-bold mb-4 font-montserrat>
            Password
          </h2>
          <input
            v-model="form.password" placeholder="123456" type="password" autocomplete="off" p="x-4 y-2" w="250px"
            text="center" bg="transparent" border="~ rounded gray-200 dark:gray-700" outline="none active:none"
          >
        </div>
      </div>
      <button type="button" :disabled="form.password.length < 6" m="t-4" w="250px" p="x-4 y-2" btn @click="goLogin()">
        Login
      </button>
    </form>
    <p my-2>
      Do not have an account?
      <NuxtLink to="/register" text-blue>
        Register
      </NuxtLink>
    </p>

    <div
      class="flex my-2 text-center truncate
    before:(content-none relative top-50% w-50% translate-y-50% b-t-1 b-gray-2)
    after:(content-none relative top-50% w-50% translate-y-50% b-t-1 b-gray-2)
    "
    >
      <span px-2 text-gray-4 text-sm>Login with</span>
    </div>
    <div flex items-center justify-evenly enter-x>
      <i i="carbon-logo-github" icon-btn type="button" @click="loginWithGithub" />
      <i i="carbon-logo-facebook" icon-btn type="button" />
      <i i="carbon-logo-twitter" icon-btn type="button" />
      <i i="carbon-logo-google" icon-btn type="button" />
    </div>
  </div>
</template>
