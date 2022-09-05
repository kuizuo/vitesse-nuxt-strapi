module.exports = plugin => {
  const sanitizeOutput = (user) => {
    const {
      password, resetPasswordToken, confirmationToken, ...sanitizedUser
    } = user;
    return sanitizedUser;
  };

  // In order to be able to see me roles
  plugin.controllers.user.me = async (ctx) => {
    if (!ctx.state.user) {
      return ctx.unauthorized();
    }
    const user = await strapi.entityService.findOne(
      'plugin::users-permissions.user',
      ctx.state.user.id,
      { populate: ['role'] }
    );

    ctx.body = sanitizeOutput(user);
  };

  // plugin.controllers.user.find = async (ctx) => {
  //   if (!ctx.state.user) {
  //     return ctx.unauthorized();
  //   }

  //   const users = await strapi.entityService.findMany(
  //     'plugin::users-permissions.user',
  //     { ...ctx.params, populate: ['*'] }
  //   );

  //   ctx.body = users.find(user => sanitizeOutput(user));
  // };

  return plugin;
};
