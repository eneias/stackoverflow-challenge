import express from 'express';
import cors from 'cors';
import compression from 'compression';
import formidable from 'express-formidable';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import {v4 as uuid} from 'uuid';

import publicRoutes from './api/routes';
import http from './utils/http';
import httpCodes from './utils/httpCodesEnum';
import env from './services/environment';

const app = express();

// Security
app.use(helmet());
app.disable('x-powered-by');
app.use(cors({
    origin: 'http://localhost:3000', //env.APP_ADDR,
    credentials: true,
}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

console.log('>>>>>  setting APP_ADDR', env.APP_ADDR);

const limiter = rateLimit({
    windowMs: 60000,
    max: 60, // limit each IP to 60 requests per minute
});
app.use(limiter);

// Compress response bodies
app.use(compression());

// requests as json (this include a `body` key on request obj)
app.use(express.json())

// Create session
const defaultMaxAge = 60 * 60 * 1000; // 1 hour
app.use(session({
    name: '_kc_sess',
    genid: uuid,
    secret: env.SESSION_SECRET,
    // TODO: Review below params
    resave: false,
    rolling: true,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
        maxAge: defaultMaxAge,
    },
}));


// const API_VERSION = '/v1';

// Application endpoints
app.use(publicRoutes);


app.use((error, req, res, next) => {

    let statusCode = error.statusCode || httpCodes.UNPROCESSABLE_ENTITY;
    if (error.joi) {
        return http.response(res, statusCode, error.joi.message);
    }

    return res.status(statusCode).send(error);
});

// All remaining requests are not found
app.use((req, res) => {
    http.response(res, httpCodes.NOT_FOUND, 'Not Found');
});

export default app;
