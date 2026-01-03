import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { Strategy as jwtStrategy, ExtractJwt } from 'passport-jwt';

import User, { IUser } from '../models/User';







const router: Router = express.Router();