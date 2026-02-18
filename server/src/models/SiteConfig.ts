import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteConfig extends Document {
    isDefault: boolean,
    banner: {
        imageUrl: string,
        title: string,
        description: string,
        linkUrl: string
    },
    information: {
        label: string;
        value: string;
    }[],
    todayProblem: {
        tier: string,
        title: string,
        linkUrl: string
    }[]
}

const SiteConfigSchema = new Schema({
    isDefault: {
        type: Boolean,
        required: true,
        default: true
    },
    banner: {
        imageUrl: {
            type: String,
            required: true,
            default: 'https://anacnu.kr/images/Activities-python-java.jpeg'
        },
        title: {
            type: String,
            required: true,
            default: '아나 동아리 가입 접수 시작'
        },
        description: {
            type: String,
            required: true,
            default: '각종 대회와 알고리즘 스터디를 할 수 있는 아나 동아리에 가입해보세요!'
        },
        linkUrl: {
            type: String,
            required: true,
            default: 'https://www.google.com'
        }
    },
    information: {
        type: [
            {
                label: { type: String, required: true },
                value: { type: String, required: true }
            }
        ],
        default: [
            { label: "총 회원수", value: "48명" },
            { label: "해결한 문제", value: "3,240+" },
            { label: "대회 참가", value: "156회" },
            { label: "스터디", value: "89회" }
        ]
    },
    todayProblem: {
        type: [
            {
                tier: { type: String, required: true },
                title: { type: String, required: true },
                linkUrl: { type: String, required: true }
            }
        ],
        defualt: [
            { tier: 'Bronze IV', linkUrl: 'https://www.acmicpc.net/problem/21633', title: 'Bank Transfer' },
            { tier: 'Bronze II', linkUrl: 'https://www.acmicpc.net/problem/3040', title: '백설 공주와 일곱 난쟁이' },
            { tier: 'Gold IV', linkUrl: 'https://www.acmicpc.net/problem/12869', title: '뮤탈리스크' }
        ]
    }
}, {
    timestamps: true
});

const SiteConfig = mongoose.model<ISiteConfig>('SiteConfig', SiteConfigSchema);

export default SiteConfig;