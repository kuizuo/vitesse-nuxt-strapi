'use strict';

/**
 * todo router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::todo.todo', {
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
  }
});
