import cron from 'node-cron';
import axios from 'axios';
import * as cheerio from 'cheerio';
import SiteConfig from '../models/SiteConfig';
import telegramMessage from '../Utils/telegramMessage';

const getRandomProblems = async (levelStart: number, levelEnd: number, solvedByGte: number, len: number) => {
    const problems: { tier: string, num: string, title: string}[] = [];
    try {
        const URL = `https://solved.ac/problems?sort=random&levelStart=${levelStart}&levelEnd=${levelEnd}&solvedByGte=${solvedByGte}`;
        const res = await axios.get(URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36'
            }
        });

        const html = res.data
        const $ = cheerio.load(html);


        $('table tbody tr').each((i, el) => {
            if (i >= len) return;

            const tds = $(el).find('td')

            const firstTd = tds.eq(0);
            const tier = firstTd.find('img').attr('alt') || '???';
            const num = firstTd.find('a').text();

            const secondTd = tds.eq(1);
            const title = secondTd.find('a').text();

            problems.push({ tier, num, title });
        });
    } catch (error) {
        console.error(error)
    }

    return problems;
}

export default () => {
    cron.schedule('0 0 0 * * *', async () => {
        try {

            const problems = await getRandomProblems(1, 15, 1000, 3);

            const todayProblem: { tier: string, title: string, linkUrl: string }[] = problems.map((el, idx) => ({
                tier: el.tier,
                title: el.title,
                linkUrl: `https://www.acmicpc.net/problem/${el.num}`
            }));
            
            await SiteConfig.updateOne({ isDefault: true }, { $set: { todayProblem: todayProblem } });

            await telegramMessage(`*오늘의 문제가 설정되었습니다!*\n\n${problems[0].num}: ${problems[0].title} (${problems[0].tier})\n${problems[1].num}: ${problems[1].title} (${problems[1].tier})\n${problems[2].num}: ${problems[2].title} (${problems[2].tier})\n\n[보러가기](https://anacnu.kr)`);

        } catch (error) {
            console.error(error);
        }
    }, {
        timezone: 'Asia/Seoul'
    })
}