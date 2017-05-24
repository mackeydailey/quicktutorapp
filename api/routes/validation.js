var Joi = require('joi');

var schemas = {};

schemas.newuser = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/[a-zA-Z0-9!#$?*_.]{1,30}/).required(),
    firstname: Joi.string().regex(/[a-zA-Z]+/).required(),
    lastname: Joi.string().regex(/[a-zA-Z]+/).required()
});

schemas.login = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/[a-zA-Z0-9!#$?*_.]{1,30}/).required()
});

schemas.newlisting = Joi.object().keys({
    title: Joi.string().regex(/[a-zA-Z0-9!?.]{3,64}/).required(),
    description: Joi.string().regex(/[a-zA-Z0-9!?.]{1,510}/).required(),
    duration: Joi.number().integer().min(0).max(10).required()
});

schemas.respond = Joi.object().keys({
    message: Joi.string().regex(/[a-zA-Z0-9!?.]{1,64}/).required()
});



module.exports = schemas;
