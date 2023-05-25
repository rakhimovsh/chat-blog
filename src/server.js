import express from 'express';
import path from 'path';
import cors from 'cors';
import fs from "fs";
import { port } from './config.js';
import { connectToDatabase } from './lib/db.js';
const app = express();

import routers from './modules/index.js'

await connectToDatabase();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(path.join(process.cwd(), 'src', 'uploads'))));
app.use('/v1', routers);


app.use((error, req, res) => {
  if (error.status !== 500) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
    });
  }

  fs.appendFileSync(path.join(process.cwd(), 'src', 'log.txt'),
    `${req.url}___${error.name}___${new Date().toISOString()}___${error.status}___${error.message}\n`,
  );

  res.status(error.status).json({
    status: error.status,
    message: 'InternalServerError',
  });

  process.exit();


});


app.listen(port, () => console.log(`SERVER RUNNING on port ${port}`));
