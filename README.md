# ANA 웹사이트 2026

## 테스트하기
docker compose up -d --build 하십쇼 하하

## 할 일
- [x] 사진 받아서 임원진 소개 만들기
- [ ] 대회 실적 같은거 받아서 업데이트 하기
- [x] Toast로 오류 예쁘게 보여주기
- [x] cors 설정
- [x] express-mongo-sanitize
- [x] joi => express-validate
- [x] helmet
- [ ] express-rate-limit (보류) => 그냥 nginx 설정으로 ddos 막아도 된다네요ㅜㅠㅠ 다행
- [x] 도커 & minio (minio 논란 오져서 그냥 도커 볼륨에 넣을 생각입니다.)
- [x] 클라에서 댓글 권한 확인하고, 있는 사람만 작성할 수 있도록 하기
- [x] 어드민 페이지
- [x] 스켈레톤 처리 확실히 하기
- [x] 실행할때 db에 어드민 없으면 만들기
- [x] 로고 누르면 홈 가기
- [x] About에 있는 사진 스크롤 변경하기 (좌우 스크롤 안되는 사람 있음) => swiper? 쓰기로함 autoplay navigation pagination(dynamic) spacebetween centered infinityloop
- [x] 글 수정 navigate 변경
- [x] 딴 사람 댓글 삭제 버튼 안보이게 하기
- [x] 글쓰기 사진 왜 업로드 안되는데 ㅅㅂ
- [x] 왜 관리자가 글을 못쓰는데 ㅅㅂㅋㅋ
- [x] 글쓰기 누르면 바로 그 게시판의 글 쓰는걸로 바꾸기
- [x] oauth app => github app
- [x] 배포할때 crossOriginOpenerPolicy: false 이거 빼야됨
- [x] ANA 동아리 회원이 아니면 가입 요청 문구 뜨게 하기
- [x] ckeditor 오류 잔뜩 수정하기
- [ ] 학과 공지 첨부파일, 사진 보이게 하기…. 귀찮아요ㅜㅜ
- [x] 소셜로그인 에러시 메시지 url쿼리에서 받아서 보여주기
- [x] 폰트 생각하기 => pretendard, mulmaru 쓰기로함
- [x] 메모리 최적화 => 동적 import , react.lazy 로 로딩 시간 단축함
- [x] 반응형 디자인 (모바일에서도 볼 수 있게) 너무 귀찮귀찮귀찮
- [x] 반응형 디자인 222
- [ ] 회원 수정 로직
- [x]  About 사진 보이게 하기
- [x] 링크트리 수정(공지 => instagram)
- [x] github action 도입
- [ ] 오늘의 문제 queue로 만들기
- [x] 게시물 over-hidden 하기
- [x] 아나 동아리 가입 폼 링크 연결
- [ ] 알고리즘 꿀팁 권한 수정
- [ ] 게시글 수정 권한 수정
- [ ] 동아리 입부 신청 이벤트 페이지
- [ ] 오늘의 문제 크게 만들고, 회원현황 없애기