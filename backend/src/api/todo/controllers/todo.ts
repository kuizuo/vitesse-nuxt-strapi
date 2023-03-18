import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::todo.todo', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service('api::todo.todo').findOne(id, query)
    return this.transformResponse(entity);
  },
  async create(ctx) {
    ctx.request.body = { ...ctx.request.body, data: { ...ctx.request.body.data, user: ctx.state.user.id }, }

    const entity = await strapi.service('api::todo.todo').create(ctx.request.body)
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);

    // Note: calling super will execute auth without users.find permissions will not create
    // let response = await super.create(ctx)
    // return response
  },
  async update(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;
    const entity = await strapi.service('api::todo.todo').findOne(id, query)

    // if entity doesn't belong to user
    if (!entity) {
      return null
    }

    return await super.update(ctx)
  },
  async delete(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service('api::todo.todo').findOne(id, query)

    // if entity doesn't belong to user
    if (!entity) {
      return null
    }

    return await super.delete(ctx)
    // const entity = await strapi.service('api::todo.todo').delete(id, query)
    // return this.transformResponse(entity);
  }
}));
