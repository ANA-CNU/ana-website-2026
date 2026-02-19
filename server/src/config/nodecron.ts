import cron from 'node-cron';
import axios from 'axios';
import SiteConfig from '../models/SiteConfig';
import telegramMessage from '../Utils/telegramMessage';

const getRandomProblems = async (levelStart: number, levelEnd: number, solvedByGte: number, len: number) => {
    let problems: { tier: string, num: string, title: string }[] = [];
    try {
        const searchString = `tier:${levelStart}..${levelEnd} solved:${solvedByGte}..`;

        const encodedQuery = encodeURIComponent(searchString);

        const URL = `https://solved.ac/api/v3/search/problem?query=${encodedQuery}&sort=random&page=1`;
        const res = await axios.get(URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36'
            }
        });

        const items = res.data.items as { level: string, titleKo: string, problemId: string }[]

        problems = items.slice(0, len).map(problem => {
            const idToTier = [
                'Unrated', 
                'Bronze V', 'Bronze IV', 'Bronze III', 'Bronze II', 'Bronze I', 
                'Silver V', 'Silver IV', 'Silver III', 'Silver II', 'Silver I', 
                'Gold V', 'Gold IV', 'Gold III', 'Gold II', 'Gold I', 
                'Platinum V', 'Platinum IV', 'Platinum III', 'Platinum II', 'Platinum I', 
                'Diamond V', 'Diamond IV', 'Diamond III', 'Diamond II', 'Diamond I', 
                'Ruby V', 'Ruby IV', 'Ruby III', 'Ruby II', 'Ruby I'
            ];

            const level = Number(problem.level);
            return {
                tier: idToTier[level],
                title: problem.titleKo,
                num: problem.problemId
            }
        })
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

            await telegramMessage(`*오늘의 문제가 설정이 안됐습니다ㅜㅜ!*\n\n하 담배 말리네 이게 왜 안되냐\n\n[담배피러가기](https://anacnu.kr)`);
        }
    }, {
        timezone: 'Asia/Seoul'
    })
}