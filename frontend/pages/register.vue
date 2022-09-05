<script setup lang="ts">
const router = useRouter()
const form = $ref({
  username: 'vitesse',
  email: '',
  password: '',
  confirmPassword: '',
})

const { register } = useStrapiAuth()

async function goRegister() {
  try {
    if (form.password !== form.confirmPassword) {
      alert('The password confirmation does not match')
      return
    }

    await register({ username: form.username, email: form.email, password: form.password })

    router.push('/')
  }
  catch (e) {
    alert(e.error.message)
  }
}
</script>

<template>
  <div font-sans>
    <h2 font-bold font-montserrat text-3xl mb-6>
      Register
    </h2>
    <form>
      <div flex="~ col" justify-center items-center>
        <div m="y-2">
          <h2 text-left font-bold mb-4 font-montserrat>
            Username
          </h2>
          <input
            v-model="form.username" placeholder="vitesse" type="text" autocomplete="off" p="x-4 y-2" w="250px"
            text="center" bg="transparent" border="~ rounded gray-200 dark:gray-700" outline="none active:none"
          >
        </div>
        <div m="y-2">
          <h2 class="text-left font-bold mb-4 font-montserrat">
            Email
          </h2>
          <input
            v-model="form.email" placeholder="vitesse@xxx.com" type="text" autocomplete="off" p="x-4 y-2" w="250px"
            text="center" bg="transparent" border="~ rounded gray-200 dark:gray-700" outline="none active:none"
          >
        </div>
        <div m="y-2">
          <h2 class="text-left font-bold mb-4 font-montserrat">
            Password
          </h2>
          <input
            v-model="form.password" placeholder="123456" type="password" autocomplete="off" p="x-4 y-2" w="250px"
            text="center" bg="transparent" border="~ rounded gray-200 dark:gray-700" outline="none active:none"
          >
        </div>
        <div m="y-2">
          <h2 class="text-left font-bold mb-4 font-montserrat">
            Repeat Password
          </h2>
          <input
            v-model="form.confirmPassword" placeholder="123456" type="password" autocomplete="off" p="x-4 y-2"
            w="250px" text="center" bg="transparent" border="~ rounded gray-200 dark:gray-700"
            outline="none active:none"
          >
        </div>
      </div>
      <button
        type="button" :disabled="form.password.length < 6 && form.confirmPassword.length < 6" m="t-4" w="250px"
        p="x-4 y-2" btn @click="goRegister()"
      >
        Register
      </button>
    </form>
    <p class="my-2">
      Already have an account?
      <NuxtLink to="/login" text-blue>
        Login
      </NuxtLink>
    </p>
  </div>
</template>

