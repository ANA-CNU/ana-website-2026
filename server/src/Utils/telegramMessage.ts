import axios from 'axios';
import { ExpressError } from './ExpressError';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export default async (message: string) => {
    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await axios.post(url, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        })
        if (!response.data.ok) {
            throw new ExpressError(500, '메시지 전송 실패ㅜㅜ');
        }
    } catch (error) {
        console.log('메시지가 안보내졌네요. 뭐 서버에 부담을 줄 수는 없으니 그저 아쉬운 거겠지요.');
    }
}