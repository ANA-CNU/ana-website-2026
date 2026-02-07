import express, { Router } from 'express';

import SiteConfig from '../models/SiteConfig';
import { TokenUser } from '../types/jwt';
import { ExpressError } from '../Utils/ExpressError';
import { authJwt } from './auth';

const router: Router = express.Router();


router.get('/', async (req, res) => {
    let siteConfig = await SiteConfig.findOne();

    if (!siteConfig) {
        siteConfig = await SiteConfig.insertOne({ isDefault: true });
    }

    res.json({ success: true, siteConfig: siteConfig });
})

router.put('/', authJwt, async (req, res) => {
    const user = req.user as TokenUser;
    if (!user.admin) throw new ExpressError(401, '관리자 권한이 없습니다');

    const siteConfig = req.body.siteConfig;
    await SiteConfig.updateOne({ isDefault: true }, siteConfig);

    res.json({ success: true });
})


export default router;