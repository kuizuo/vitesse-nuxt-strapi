import { factories } from '@strapi/strapi'

export default factories.createCoreRouter('api::todo.todo', {
  config: {
    find: {
      middlewares: ['api::todo.todo-middleware'],
    },
    findOne: {
      middlewares: ['api::todo.todo-middleware'],
    },
    update: {
      middlewares: ['api::todo.todo-middleware'],
    },
    delete: {
      middlewares: ['api::todo.todo-middleware'],
    },
  },
  only: ['find', 'findOne', 'update', 'delete'],
});
