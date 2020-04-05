const express = require('express'); 
const { celebrate, Joi, Segments } = require('celebrate');

const routes = express.Router(); 
const OngController = require('./controllers/OngController'); 
const IncidentsController = require('./controllers/IncidentsController'); 
const ProfileController = require('./controllers/ProfileController'); 
const SessionController = require('./controllers/SessionController'); 

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required().min(8), 
    }) 
}) , SessionController.create); 

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(8),
        city: Joi.string().required(), 
        uf: Joi.string().required().length(2),  
    }) 
}), OngController.create); 

routes.post('/ongs/delete/:id',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(), 
    }).unknown(),   
}),  OngController.delete); 

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(), 
    }).unknown(), 
}),  ProfileController.index); 

routes.get('/incidents',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(), 
    }), 
}),IncidentsController.index)

routes.post('/incidents',celebrate({
    [Segments.BODY]:Joi.object().keys({
        title: Joi.string().required(), 
        description:Joi.string().required(), 
        value:Joi.number().required(), 
    }), 
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().min(8), 
    }).unknown(), 
}),  IncidentsController.create); 


routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]:Joi.object().keys({   
        id: Joi.number().required(), 
    })
}), IncidentsController.delete); 

module.exports = routes; 
