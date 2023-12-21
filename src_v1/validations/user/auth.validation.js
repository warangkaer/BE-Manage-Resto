const { checkSchema } = require("express-validator");

module.exports = {
  createUserValidation: async (req) => {
    const result = await checkSchema({
      username: {
        notEmpty: true,
        isLength: {
          options: { min: 8 },
        },
      },
    }).run(req)

    if(!result.isEmpty()) return {status : 422, message : 'Username Cannot Be empty'}
  }

};
