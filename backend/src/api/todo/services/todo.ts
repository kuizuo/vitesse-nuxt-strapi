// @ts-nocheck
import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::todo.todo", ({ strapi }) => ({
  // Determine if entry belongs to the user
  async findOne(entityId, params = {}) {
    const entry = await strapi.db.query('api::todo.todo').findOne({
      where: { user: params.filters?.user },
      ...(params.populate ? { populate: params.populate } : null)
    });
    return entry
  },
  // async delete(entityId, param) {
  //   const entry = await strapi.db.query('api::todo.todo').delete({
  //     where: { id: entityId, user: params.filters?.user },
  //   });
  //   return entry
  // }
}));
