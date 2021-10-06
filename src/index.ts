import "reflect-metadata";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
import express from "express";
import router from "./route";
import cors from "cors"
import swaggerUi = require('swagger-ui-express');
import fs = require('fs');

   const swaggerFile: any = (process.cwd()+"/swagger.json");
    const  swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
     const swaggerDocument = JSON.parse(swaggerData);

createConnection()
  .then(async (connection) => {
    console.log("Express application is up and running on port 3000");
  })
  .catch((error) => console.log("TypeORM connection error: ", error));

// create express app
export const app = express();
app.use(cors()) 
app.use(express.json());

app.use(`/api/`, router);

app.use('/api/docs', swaggerUi.serve,
            swaggerUi.setup(swaggerDocument, null, null, null));

// run app
app.listen(process.env.PORT);
