import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import passport from 'passport';
import { 
    Strategy as localStrategy,
    IStrategyOptions as LocalStrategyOptions,
    VerifyFunction as LocalVerifyFunction
} from 'passport-local';
import { 
    Strategy as jwtStrategy,
    ExtractJwt,
    StrategyOptions as JwtStrategyOptions,
    VerifiedCallback as JwtVerifiedCallback
} from 'passport-jwt';
import { 
    Strategy as GoogleStrategy,
    StrategyOptions as GoogleStrategyOptions,
    StrategyOptionsWithRequest as GoogleStrategyOptionsWithRequest,
    Profile as GoogleProfile,
    VerifyCallback as GoogleVerifyCallback
} from 'passport-google-oauth20';
import { 
    Strategy as githubStrategy,
    StrategyOptions as GithubStrategyOptions,
    StrategyOptionsWithRequest as GithubStrategyOptionsWithRequest,
    Profile as GithubProfile,
} from 'passport-github2';
import {
    VerifyCallback as GithubVerifyCallback
} from 'passport-oauth2';

import User, { IUser } from '../models/User';
import { ExpressError } from '../Utils/ExpressError';
import { TokenUser } from '../types/jwt';




const socialLogin = async (provider: 'google' | 'github', profileId: string, name: string): Promise<TokenUser> => {
    const user = await User.findOne({ [`${provider}id`]: profileId });
    
    if (!user) {
        const newUser: TokenUser = {
            name: name,
            userid: '202600000',
            admin: false,
            isnew: true,
            provider: provider,
            profileId: profileId
        }
        return newUser;
    }

    const tokenUser: TokenUser = {
        name: user.name,
        userid: user.userid,
        admin: user.admin
    }
    return tokenUser;
}

export default () => {
    
    // ========== Local Strategy ==========

    const localOptions: LocalStrategyOptions = {
        usernameField: 'userid',
        passwordField: 'password'
    }
    const localVerify: LocalVerifyFunction = async (userid, password, done) => {
        try {
            const user = await User.findOne({ userid: userid });
            if (!user) {
                return done(new ExpressError(401, '아이디 또는 비밀번호가 잘못되었습니다.'));
            }
    
            if (!user.password) {
                if (!user.googleid) {
                    return done(new ExpressError(401, '깃허브로 로그인 해주세요.'));
                } else {
                    return done(new ExpressError(401, '구글로 로그인 해주세요.'));
                }
            }

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return done(new ExpressError(401, '아이디 또는 비밀번호가 잘못되었습니다.'));
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
    passport.use(new localStrategy(localOptions, localVerify));


    // ========== Jwt Strategy ==========

    const jwtOptions: JwtStrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET as string
    }
    const jwtVerify = async (payload: TokenUser, done: JwtVerifiedCallback) => {
        try {
            const user: TokenUser = { userid: payload.userid, name: payload.name, admin: payload.admin }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
    passport.use(new jwtStrategy(jwtOptions, jwtVerify));

    
    // ========== Google Strategy ==========

    const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID as string;
    const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET as string;

    const googleOptions: GoogleStrategyOptions = {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback'
    }
    const googleVerify = async (accessToken: string, refreshToken: string, profile: GoogleProfile, done: GoogleVerifyCallback) => {
        try {
            const tokenUser = await socialLogin('google', profile.id, profile.displayName);

            return done(null, tokenUser);
        } catch (error) {
            return done(error);
        }
    }
    passport.use('google', new GoogleStrategy(googleOptions, googleVerify));

    /* 샤갈 열심히 만들었는데ㅜㅠㅠ
    // 로그인 전략
    const googleLoginOptions: GoogleStrategyOptions = {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/login/callback'
    }
    const googleLoginVerify = async (accessToken: string, refreshToken: string, profile: GoogleProfile, done: GoogleVerifyCallback) => {
        try {
            const user = await User.findOne({ googleid: profile.id });
            if (!user) { return done(new ExpressError(401, '가입되지 않은 계정입니다.')); }

            const tokenUser: TokenUser = { name: user.name, userid: user.userid, admin: user.admin };
            return done(null, tokenUser);
        } catch (error) {
            return done(error);
        }
    }
    passport.use('google-login', new GoogleStrategy(googleLoginOptions, googleLoginVerify));

    // 연동 전략
    const googleConnectOptions: GoogleStrategyOptionsWithRequest = {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/connect/callback',
        passReqToCallback: true
    }
    const googleConnectVerify = async (req: Request, accessToken: string, refreshToken: string, profile: GoogleProfile, done: GoogleVerifyCallback) => {
        try {
            const connect_userid = req.cookies.connect_userid;
            if (!connect_userid) { return done(new ExpressError(400, '연동 시간이 만료되었습니다.')); }

            const user = await User.findOne({ userid: connect_userid });
            if (!user) { return done(new ExpressError(404, '유저를 찾을 수 없습니다.')); }

            const googleUser = await User.findOne({ googleid: profile.id });
            if (googleUser && user.userid !== googleUser.userid) { return done(new ExpressError(409, '이미 있는 구글 유저입니다.')); }

            user.googleid = profile.id;
            await user.save();

            const tokenUser: TokenUser = { name: user.name, userid: user.userid, admin: user.admin };
            return done(null, tokenUser);
        } catch (error) {
            return done(error);
        }
    }
    passport.use('google-connect', new GoogleStrategy(googleConnectOptions, googleConnectVerify));
    */


    // ========== Github Strategy ==========

    const GITHUB_CLIENT_ID: string = process.env.GITHUB_CLIENT_ID as string;
    const GITHUB_CLIENT_SECRET: string = process.env.GITHUB_CLIENT_SECRET as string;

    const githubOptions: GithubStrategyOptions = {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: '/api/auth/github/callback'
    }
    const githubVerify = async (accessToken: string, refreshToken: string, profile: GithubProfile, done: GithubVerifyCallback) => {
        try {
            const tokenUser = await socialLogin('github', profile.id, profile.displayName);

            return done(null, tokenUser);
        } catch (error) {
            return done(error);
        }
    }
    passport.use('github', new githubStrategy(githubOptions, githubVerify));

    /*
    // 로그인 전략
    const githubLoginOptions: GithubStrategyOptions = {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: '/api/auth/github/login/callback'
    }
    const githubLoginVerify = async (accesstoken: string, refreshToken: string, profile: GithubProfile, done: GithubVerifyCallback) => {
        try {
            const user = await User.findOne({ githubid: profile.id });
            if (!user) { return done(new ExpressError(401, '가입되지 않은 계정입니다.')); }

            const tokenUser: TokenUser = { name: user.name, userid: user.userid, admin: user.admin };
            return done(null, tokenUser);
        } catch (error) {
            return done(error);
        }
    }
    passport.use('github-login', new githubStrategy(githubLoginOptions, githubLoginVerify));
    
    // 연동 전략
    const githubConnectOptions: GithubStrategyOptionsWithRequest = {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: '/api/auth/github/connect/callback',
        passReqToCallback: true
    }
    const githubConnectVerify = async (req: Request, accesstoken: string, refreshToken: string, profile: GithubProfile, done: GithubVerifyCallback) => {
        try {
            const connect_userid = req.cookies.connect_userid;
            if (!connect_userid) { return done(new ExpressError(400, '연동 시간이 만료되었습니다.')); }

            const user = await User.findOne({ userid: connect_userid });
            if (!user) { return done(new ExpressError(404, '유저를 찾을 수 없습니다.')); }

            const githubUser = await User.findOne({ githubid: profile.id });
            if (githubUser && user.userid !== githubUser.userid) { return done(new ExpressError(409, '이미 있는 깃허브 유저입니다.')); }

            user.githubid = profile.id;
            await user.save();

            const tokenUser: TokenUser = { name: user.name, userid: user.userid, admin: user.admin };
            return done(null, tokenUser);
        } catch (error) {
            return done(error);
        }
    }
    passport.use('github-connect', new githubStrategy(githubConnectOptions, githubConnectVerify));
    */
}