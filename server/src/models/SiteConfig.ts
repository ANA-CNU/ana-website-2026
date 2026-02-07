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
    }
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
            default: 'https://anacnu.kr/images/Activities-algorithm-study.jpeg'
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
        tier: {
            type: String,
            required: true,
            default: 'Bronze 5'
        },
        title: {
            type: String,
            required: true,
            default: '#1000 A+B'
        },
        linkUrl: {
            type: String,
            required: true,
            default: 'https://www.acmicpc.net/problem/1000'
        }
    }
}, {
    timestamps: true
});

const SiteConfig = mongoose.model<ISiteConfig>('SiteConfig', SiteConfigSchema);

export default SiteConfig;