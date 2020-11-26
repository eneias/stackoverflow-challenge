import express from 'express';

const {celebrate, Segments, Joi} = require('celebrate');

import userService from '../services/user';
import http from '../utils/http';
import httpCodes from '../utils/httpCodesEnum';
import errHelper from '../utils/error';


const getAll = (req, res, next) => {
    userService.getAll()
        .then((result) => {
            if (result.error) {
                http.response(res, httpCodes.BAD_REQUEST, result.message);
            } else {
                http.response(res, httpCodes.OK, result.message, result.data);
            }
        }).catch((e) => {
        const errorInfo = errHelper.handle(e);
        return http.responseError(res, errorInfo);
    });
};

const get = (req, res, next) => {
    
    userService.get(req.params.text)
        .then((result) => {
            if (result.error) {
                http.response(res, httpCodes.BAD_REQUEST, result.message);
            } else {
                http.response(res, httpCodes.OK, result.message, result.data);
            }
        }).catch((e) => {
        const errorInfo = errHelper.handle(e);
        return http.responseError(res, errorInfo);
    });
};

const upsert = (req, res, next) => {
    
    userService.upsert().then((result) => {
        console.debug(result)
        if (result.error) {
            http.response(res, httpCodes.BAD_REQUEST, result.message);
        } else {
            http.response(res, httpCodes.OK, result.message, {id: result.data.id});
        }
    }).catch((e) => {
        console.debug(e)
        const errorInfo = errHelper.handle(e);
        return http.responseError(res, errorInfo);
    });

};

const deleteUser = (req, res, next) => {
    console.debug('DELETE /user/:userId');

    userService.delete(req.params.userId).then((result) => {
        if (result.error) {
            http.response(res, httpCodes.BAD_REQUEST, result.message);
        } else {
            http.response(res, httpCodes.OK, result.message);
        }
    }).catch((e) => {
        const errorInfo = errHelper.handle(e);
        return http.responseError(res, errorInfo);
    });
};

const router = express.Router();

router.get('/', getAll);

const validateParams = {
    [Segments.PARAMS]: Joi.object().keys({
        text: Joi.string().required()
    }),
};

router.post('/saveAll', upsert);

router.get('/search/:text', celebrate(validateParams), get);
router.delete('/:userId', deleteUser);

export default router;
