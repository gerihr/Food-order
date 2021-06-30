import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import passport = require('passport');
import flash = require("connect-flash");
import * as session from "express-session";
import { NestExpressApplication } from '@nestjs/platform-express';


require('dotenv').config();
const cors = require("cors");

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors());

  app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header('Access-Control-Expose-Headers', 'Content-Type, X-Total-Count, Origin, Accept, X-Requested-With');
    res.header("Access-Control-Allow-Method", "PUT");
    next();
  });

  app.use(session({
    secret: process.env["JWT_SECRET_KEY"],
    resave: true,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());


  await app.listen(3001);
}

async function main() {
  await bootstrap();
}

main();