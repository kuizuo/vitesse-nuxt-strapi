<script setup lang="ts">
import type { Strapi4Response } from '@nuxtjs/strapi/dist/runtime/types'
import type { Todo } from '~/types'

const { find, create, update, delete: _delete } = useStrapi4()

const { data, refresh } = $(await useAsyncData<Strapi4Response<Todo>>('todos', () => find<Strapi4Response<Todo>>('todos')))

const todos = $computed(() => data?.data as unknown as Todo[])
const activeTodos = $computed(() => todos.filter(t => t.attributes.status === false))
const completedTodos = $computed(() => todos.filter(t => t.attributes.status === true))
// const total = $computed(() => data.meta.pagination.total as number)

let todoText = $ref('')

const onCreate = async () => {
  if (todoText) {
    await create<Todo>('todos', { value: todoText, status: false })
    todoText = ''
    await refresh()
  }
}

const onDelete = async (todo: Todo) => {
  await _delete<Todo>('todos', todo.id)
  todos.splice(todos.indexOf(todo), 1)
}

const onUpdate = async (todo: Todo, e) => {
  if (todo) {
    const value = e.target.value.trim()

    if (todo.attributes.value === value)
      return

    if (!value) {
      await onDelete(todo)
      return
    }

    await update('todos', todo.id, { value })
    await refresh()
  }
}

const changeStatus = async (id: number, status: boolean) => {
  await update('todos', id, { status })
  await refresh()
}

definePageMeta({
  layout: 'home',
  middleware: 'auth',
  keepalive: false,
})
</script>

<template>
  <div mx-auto w="68">
    <div flex justify-center items-center>
      <h2 font-montserrat font-blod text-2xl>
        TodoList
      </h2>
      <i ml-1 i-carbon:rotate-360 btn p-1 text-sm rounded transition-all-500 hover:-rotate-180 @click="refresh" />
    </div>
    <div>
      <div my-2 flex bg-gray-1 dark:bg-gray-8>
        <input
          v-model="todoText" type="text" font-montserrat w-52 text-center bg-transparent border-0 outline-none
          @keyup.enter="onCreate"
        >
        <button ml-2 btn @click="onCreate">
          add
        </button>
      </div>

      <div>
        <div
          class="flex my-2 text-center truncate
    before:(content-none relative top-50% w-50% translate-y-50% b-t-1 b-primary)
    after:(content-none relative top-50% w-50% translate-y-50% b-t-1 b-primary)
    "
        >
          <span px-2 text-gray-4 text-sm>{{ activeTodos.length }} Active</span>
        </div>
        <TransitionGroup tag="ul" name="list" class="flex flex-col gap-2 font-montserrat">
          <li v-for="todo in activeTodos" :key="todo.id" class="group" inline-flex items-center px-2 py-2 b-1 rounded>
            <input
              flex-1 :checked="todo.attributes.status" type="checkbox" bg-primary-500
              @click="changeStatus(todo.id, !todo.attributes.status)"
            >
            <p px-2>
              <input
                text-center outline-primary-500 bg-transparent :value="todo.attributes.value"
                @blur="onUpdate(todo, $event)" @keyup.enter="onUpdate(todo, $event)"
              >
            </p>
            <i i-carbon-close text-red icon-btn opacity-0 group-hover:opacity-100 @click="onDelete(todo)" />
          </li>
        </TransitionGroup>
      </div>

      <div>
        <div
          class="flex my-2 text-center truncate
    before:(content-none relative top-50% w-50% translate-y-50% b-t-1 b-primary)
    after:(content-none relative top-50% w-50% translate-y-50% b-t-1 b-primary)
    "
        >
          <span px-2 text-gray-4 text-sm>{{ completedTodos.length }} Completed</span>
        </div>
        <TransitionGroup tag="ul" name="list" class="flex flex-col gap-2 font-montserrat">
          <li
            v-for="todo in completedTodos" :key="todo.id" class="group" inline-flex items-center px-2 py-2 b-1
            rounded
          >
            <input
              flex-1 :checked="todo.attributes.status" type="checkbox"
              @click="changeStatus(todo.id, !todo.attributes.status)"
            >
            <p px-2>
              <input
                text-center outline-primary-5 bg-transparent :value="todo.attributes.value"
                @blur="onUpdate(todo, $event)" @keyup.enter="onUpdate(todo, $event)"
              >
            </p>
            <i i-carbon-close text-red icon-btn opacity-0 group-hover:opacity-100 @click="onDelete(todo)" />
          </li>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
