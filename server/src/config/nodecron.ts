import cron from 'node-cron';
import SiteConfig from '../models/SiteConfig';
import telegramMessage from '../Utils/telegramMessage';
import { ExpressError } from '../Utils/ExpressError';

import bronzeProblems from '../assets/problem_lvlstart1_lvlend5_solved1000.json';
import silverProblems from '../assets/problem_lvlstart6_lvlend10_solved1000.json';
import goldProblems from '../assets/problem_lvlstart11_lvlend15_solved1000.json';
import platinumProblems from '../assets/problem_lvlstart16_lvlend20_solved500.json';
const problems = [bronzeProblems, silverProblems, goldProblems, platinumProblems];

const idToTier = [
    'Unrated',
    'Bronze V', 'Bronze IV', 'Bronze III', 'Bronze II', 'Bronze I',
    'Silver V', 'Silver IV', 'Silver III', 'Silver II', 'Silver I',
    'Gold V', 'Gold IV', 'Gold III', 'Gold II', 'Gold I',
    'Platinum V', 'Platinum IV', 'Platinum III', 'Platinum II', 'Platinum I',
    'Diamond V', 'Diamond IV', 'Diamond III', 'Diamond II', 'Diamond I',
    'Ruby V', 'Ruby IV', 'Ruby III', 'Ruby II', 'Ruby I'
];

const pickRandomProblem = (problemsArray: { tier: number, title: string, num: number }[]) => {
    const randomIndex = Math.floor(Math.random() * problemsArray.length);
    return problemsArray[randomIndex];
};

const setTodayProblem = async () => {
    try {

        const todayProblem = [];
        for (let i = 0; i < 3; i++) {
            const randomProblem = pickRandomProblem(problems[i]);
            todayProblem.push(randomProblem);
        }

        const siteConfig = await SiteConfig.findOne({ isDefault: true });
        if (!siteConfig) throw new ExpressError(500, '이거 왜 없냐');

        for (let i = 0; i < 3; i++) {
            siteConfig.todayProblem[i] = {
                tier: idToTier[todayProblem[i].tier],
                title: todayProblem[i].title,
                linkUrl: `https://www.acmicpc.net/problem/${todayProblem[i].num}`
            }
        }

        await siteConfig.save();

        await telegramMessage(`*오늘의 문제가 설정되었습니다!*\n\n${todayProblem[0].num}: ${todayProblem[0].title} (${idToTier[todayProblem[0].tier]})\n${todayProblem[1].num}: ${todayProblem[1].title} (${idToTier[todayProblem[1].tier]})\n${todayProblem[2].num}: ${todayProblem[2].title} (${idToTier[todayProblem[2].tier]})\n\n[보러가기](https://anacnu.kr)`);

    } catch (error) {
        console.error(error);
        await telegramMessage(`*오늘의 문제가 설정이 안됐습니다ㅜㅜ!*\n\n하 담배 말리네 이게 왜 안되냐\n\n[담배피러가기](https://anacnu.kr)`);
    }
}

const setWeekChallenge = async () => {
    try {

        const weekChallenge = pickRandomProblem(problems[3]);

        const siteConfig = await SiteConfig.findOne({ isDefault: true });
        if (!siteConfig) throw new ExpressError(500, '이거 왜 없냐');

        siteConfig.todayProblem[3] = {
            tier: idToTier[weekChallenge.tier],
            title: weekChallenge.title,
            linkUrl: `https://www.acmicpc.net/problem/${weekChallenge.num}`
        }

        await siteConfig.save();

        await telegramMessage(`*주간 챌린지가 설정되었습니다!*\n\n${weekChallenge.num}: ${weekChallenge.title} (${idToTier[weekChallenge.tier]})\n\n[보러가기](https://anacnu.kr)`);

    } catch (error) {
        console.error(error);
        await telegramMessage(`*주간 챌린지가 설정이 안됐습니다ㅜㅜ!*\n\n하 담배 말리네 이게 왜 안되냐\n\n[담배피러가기](https://anacnu.kr)`);
    }
}

const initialSetting = async () => {
    try {
        const siteConfig = await SiteConfig.findOne({ isDefault: true });
        if (!siteConfig) throw new ExpressError(500, '이게 왜 없냐;; ㅅㅂ');
        if (!siteConfig.todayProblem || siteConfig.todayProblem.length < 4) {
            setTodayProblem();
            setWeekChallenge();
        }
    } catch (error) {
        console.error(error);
    }
}

export default () => {

    cron.schedule('0 0 0 * * *', () => {
        setTodayProblem();
    }, {
        timezone: 'Asia/Seoul'
    })

    cron.schedule('0 0 0 * * 1', () => {
        setWeekChallenge();
    }, {
        timezone: 'Asia/Seoul'
    })

    initialSetting();
    
}