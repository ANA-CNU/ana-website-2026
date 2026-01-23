import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport, { authenticate } from 'passport';
import bcrypt from 'bcrypt';

import User, { IUser } from '../models/User';
import Member from '../models/Member';
import { TokenUser } from '../types/jwt';
import { ExpressError } from '../Utils/ExpressError';


const router: Router = express.Router();


const JWT_SECRET: string = process.env.JWT_SECRET as string;


const generateRegisterToken = (user: TokenUser): string => {
    const payload: TokenUser = {
        name: user.name,
        userid: user.userid,
        admin: user.admin,
        member: user.member,
        provider: user.provider,
        profileid: user.profileid
    };
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
}

const generateAccessToken = (user: TokenUser): string => {
    const payload: TokenUser = {
        name: user.name,
        userid: user.userid,
        admin: user.admin,
        member: user.member
    };
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
}

const generateRefreshToken = (user: TokenUser): string => {
    const payload: TokenUser = {
        name: user.name,
        userid: user.userid,
        admin: user.admin,
        member: user.member
    };
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '14d' });
}

const checkMember = async (userid: string): Promise<boolean> => {
    const member = await Member.findOne({ userid: userid });
    return (!member ? false : true);
}


// ========== 가입 및 로그인 ==========

router.post('/refresh', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) { throw new ExpressError(401, 'No Token'); }

    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET as string) as TokenUser;

    const isMember = await checkMember(payload.userid);
    if (payload.member != isMember) {
        await User.updateOne({ userid: payload.userid }, { member: isMember });
    }
    const user: TokenUser = {
        name: payload.name,
        userid: payload.userid,
        admin: payload.admin,
        member: isMember
    }
    const newAccessToken = generateAccessToken(user);
    res.json({ success: true, accessToken: newAccessToken });
})

router.post('/testregister', async (req, res) => {
    const name = req.body.name;
    const userid = req.body.userid;
    const password = await bcrypt.hash(req.body.password, 10);

    const isMember = await checkMember(userid);
    const admin = new User({
        name: name,
        userid: userid,
        password: password,
        admin: true,
        member: isMember
    });

    await admin.save();
    res.json({ success: true });
})

router.post('/register', async (req, res) => {
    const { name, userid, password } = req.body;
    if (!name || !userid || !password) throw new ExpressError(400, '잘못된 입력입니다.');

    const bcryptPassword = await bcrypt.hash(password, 10);
    const isMember = await checkMember(userid);
    const newUser = new User({
        name: name,
        userid: userid,
        password: bcryptPassword,
        admin: false,
        member: isMember
    })

    await newUser.save();
    res.json({ success: true });
})

router.post(
    '/login',
    passport.authenticate('local', { session: false }),
    async (req, res) => {
        const user = req.user as TokenUser;
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.json({ success: true, accessToken });
    }
)

router.post('/logout', (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ success: true });
})

router.get('/google', passport.authenticate('google', { session: false, scope: ['profile'] }))

router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', { session: false }, (error: any, user: TokenUser) => {
        if (error || !user) { return res.redirect(`${process.env.CLIENT_URL as string}/login?error=${encodeURIComponent(error.message || '로그인 실패')}`); }

        if (user.isnew) {
            const registerToken = generateRegisterToken(user);
            return res.redirect(`${process.env.CLIENT_URL as string}/register/social?registerToken=${registerToken}`);
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.redirect(`${process.env.CLIENT_URL as string}/login/success?accessToken=${accessToken}`);
    })(req, res, next);
})

router.get('/github', passport.authenticate('github', { session: false, scope: ['user:email'] }))

router.get('/github/callback', (req, res, next) => {
    passport.authenticate('github', { session: false }, (error: any, user: TokenUser) => {
        if (error || !user) { return res.redirect(`${process.env.CLIENT_URL as string}/login?error=${encodeURIComponent(error.message || '로그인 실패')}`); }

        if (user.isnew) {
            const registerToken = generateRegisterToken(user);
            return res.redirect(`${process.env.CLIENT_URL as string}/register/social?registerToken=${registerToken}`);
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.redirect(`${process.env.CLIENT_URL as string}/login/success?accessToken=${accessToken}`);
    })(req, res, next);
})

router.post('/social/register', async (req, res) => {
    const { registerToken, userid, name } = req.body;
    if (!registerToken || !userid || !name) throw new ExpressError(400, '토큰 또는 입력값이 누락되었습니다.');

    const decoded = jwt.verify(registerToken, process.env.JWT_SECRET as string) as TokenUser;

    const existUser = await User.findOne({ [`${decoded.provider}id`]: decoded.profileid });
    if (existUser) throw new ExpressError(409, '이미 가입된 계정입니다.');

    const checkid = await User.findOne({ userid: userid });
    if (checkid) throw new ExpressError(409, '이미 존재하는 학번입니다.');

    const isMember = await checkMember(userid);
    const newUser = new User({
        name: name,
        userid: userid,
        admin: false,
        member: isMember,
        [`${decoded.provider}id`]: decoded.profileid
    });

    await newUser.save();

    const tokenUser: TokenUser = {
        name: newUser.name,
        userid: newUser.userid,
        admin: false,
        member: isMember
    }

    const accessToken = generateAccessToken(tokenUser);
    const refreshToken = generateRefreshToken(tokenUser);

    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.json({ success: true, accessToken: accessToken });
})

/*
router.get(
    '/google/login',
    passport.authenticate('google-login', { session: false, scope: ['profile'] })
)

router.get(
    '/google/login/callback',
    (req, res, next) => {
        passport.authenticate('google-login', { session: false }, (error: any, user: TokenUser) => {
            if (error || !user) { return res.redirect(`${CLIENT_URL}/login?error=${ encodeURIComponent(error.message || '로그인 실패') }`); }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            res.cookie('refreshToken', refreshToken, { httpOnly: true });
            res.redirect(`${ CLIENT_URL }/login/success?accessToken=${ accessToken }`);
        })(req, res, next);
    }
)

router.get(
    '/google/connect',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        const user = req.user as TokenUser;
        res.cookie('connect_userid', user.userid, { maxAge: 1000*60*10 });
        return next();
    }, 
    passport.authenticate('google-connect', { session: false, scope: ['profile'] })
)

router.get(
    '/google/connect/callback', 
    (req, res, next) => {
        passport.authenticate('google-connect', { session: false }, (error: any, user: TokenUser) => {
            res.clearCookie('connect_userid');
            if (error || !user) { return res.redirect(`${CLIENT_URL}/settings?error=${ encodeURIComponent(error.message || '로그인 실패') }`); }
            res.redirect(`${ CLIENT_URL }/settings?success=google_connected`);
        })(req, res, next)
    }
)

router.get(
    '/github/login',
    passport.authenticate('github-login', { session: false, scope: ['user:email'] })
)

router.get(
    '/github/login/callback',
    (req, res, next) => {
        passport.authenticate('github-login', { session: false }, (error: any, user: TokenUser) => {
            if (error || !user) { return res.redirect(`${CLIENT_URL}/login?error=${ encodeURIComponent(error.message || '로그인 실패') }`); }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            res.cookie('refreshToken', refreshToken, { httpOnly: true });
            res.redirect(`${ CLIENT_URL }/login/success?accessToken=${ accessToken }`);
        })(req, res, next);
    }
)

router.get(
    '/github/connect',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        const user = req.user as TokenUser;
        res.cookie('connect_userid', user.userid, { maxAge: 1000*60*10 });
        return next();
    }, 
    passport.authenticate('github-connect', { session: false, scope: ['user:email'] })
)

router.get(
    '/github/connect/callback', 
    (req, res, next) => {
        passport.authenticate('github-connect', { session: false }, (error: any, user: TokenUser) => {
            res.clearCookie('connect_userid');
            if (error || !user) { return res.redirect(`${CLIENT_URL}/settings?error=${ encodeURIComponent(error.message || '로그인 실패') }`); }
            res.redirect(`${ CLIENT_URL }/settings?success=github_connected`);
        })(req, res, next)
    }
)
*/


// ========== 아나 회원 관리 ==========

export const authJwt = passport.authenticate('jwt', { session: false });

router.get('/members', authJwt, async (req, res) => {
    const user = req.user as TokenUser;
    if (!user.admin) throw new ExpressError(403, '관리자 권한이 없습니다.');

    const members = await Member.find();
    res.json({ success: true, members: members });
})

router.post('/member', authJwt, async (req, res) => {
    const user = req.user as TokenUser;
    if (!user.admin) throw new ExpressError(403, '관리자 권한이 없습니다.');

    const { name, userid, number, email } = req.body;
    if (!name || !userid || !number) throw new ExpressError(400, '입력값이 누락되었습니다.');

    const newMember = new Member({ name: name, userid: userid, number: number, email: email });
    await newMember.save();
    res.json({ success: true, member: newMember });
})

router.delete('/member/:userid', authJwt, async (req, res) => {
    const user = req.user as TokenUser;
    if (!user.admin) throw new ExpressError(403, '관리자 권한이 없습니다.');

    const { userid } = req.params;
    if (!userid) throw new ExpressError(400, '입력값이 누락되었습니다.');

    const deletedMember = await Member.findOneAndDelete({ userid: userid });
    if (!deletedMember) throw new ExpressError(404, '회원이 존재하지 않습니다.');

    res.json({ success: true, member: deletedMember });
})


export default router;