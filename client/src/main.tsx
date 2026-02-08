import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import '../src/styles/index.css'

console.log('안녕하세요! 저는 이 웹사이트의 개발자이자 ANA동아리의 교육부장인 김동희입니다. ANA 동아리방으로 찾아오시면 밥이라도 한 끼 사드리도록 하겠습니다. 그리고 만약 버그나 보안 위험을 찾으신다면 202500392@o.cnu.ac.kr로 제보 부탁드립니다ㅜㅜ 좋은 하루 되세요!');

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
