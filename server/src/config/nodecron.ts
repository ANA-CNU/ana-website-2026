import cron from 'node-cron';
import axios from 'axios';
import SiteConfig from '../models/SiteConfig';
import telegramMessage from '../Utils/telegramMessage';
import { ExpressError } from '../Utils/ExpressError';

const getRandomProblems = async (len: number) => {
    const set = new Set<number>();

    const problems = (await import('../assets/problem_lvlstart1_lvlend15_solved5000.json')).default

    while (set.size < len) {
        const randomIdx = Math.floor(Math.random() * problems.length);
        set.add(randomIdx);
    }

    const randomProblems = Array.from(set).map(ri => problems[ri]);

    return randomProblems;
}

export default () => {
    cron.schedule('0 0 0 * * *', async () => {
        try {

            const problems = await getRandomProblems(3);

            if (problems.length < 3) throw new ExpressError(500, '담배 말린다 진짜 왜 안되겠냐 되겠지');

            const todayProblem: { tier: string, title: string, linkUrl: string }[] = problems.map(p => ({
                tier: p.tier,
                title: p.title,
                linkUrl: `https://www.acmicpc.net/problem/${p.num}`
            }));

            await SiteConfig.updateOne({ isDefault: true }, { $set: { todayProblem: todayProblem } });

            await telegramMessage(`*오늘의 문제가 설정되었습니다!*\n\n${problems[0].num}: ${problems[0].title} (${problems[0].tier})\n${problems[1].num}: ${problems[1].title} (${problems[1].tier})\n${problems[2].num}: ${problems[2].title} (${problems[2].tier})\n\n[보러가기](https://anacnu.kr)`);

        } catch (error) {
            console.error(error);

            await telegramMessage(`*오늘의 문제가 설정이 안됐습니다ㅜㅜ!*\n\n하 담배 말리네 이게 왜 안되냐\n\n[담배피러가기](https://anacnu.kr)`);
        }
    }, {
        timezone: 'Asia/Seoul'
    })
}