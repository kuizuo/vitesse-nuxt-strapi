'use strict';

/**
 * `test` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const filters = { ...ctx.query?.filters, user: ctx.state.user.id }
    ctx.query = { ...ctx.query, filters }

    await next();
  };
};
