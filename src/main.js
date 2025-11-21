import express from 'express';
import expressOpenApiValidator from "express-openapi-validator";
import path from 'path';
import UserRouter from './Router_Controllers/UserRouter.js';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const NODE_PORT = process.env.NODE_PORT ? process.env.NODE_PORT : 3000;

app.get("/health", (req, res)=> {
    res.send("OK");
})


const openApiPath = path.join(process.cwd(), 'schema.api.yml');

const openApiDocument = YAML.load(openApiPath);

app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use(expressOpenApiValidator.middleware({
    apiSpec: openApiPath,
    validateRequests: true, 
    validateResponses: false
}));

app.use('/api/user', UserRouter);

app.use((err, req, res, next) => {
    if (err.status && err.errors) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message,  
            errors: err.errors 
        });
    }

    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || "Internal Server Error"
    });
});

app.listen(NODE_PORT, () => {
    console.log(`Application Running and Listening in port ${NODE_PORT}`)
})
