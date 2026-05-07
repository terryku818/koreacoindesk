# Korea Coin Desk 샘플 사이트

이 ZIP 파일은 Vercel에 올릴 수 있는 React/Vite 샘플 사이트입니다.

## 1. GitHub에 올리는 방법

1. ZIP 파일 압축을 풉니다.
2. `koreacoindesk` 폴더 안으로 들어갑니다.
3. GitHub에서 `koreacoindesk`라는 Private 저장소를 만듭니다.
4. GitHub의 `Add file` → `Upload files`를 누릅니다.
5. 이 폴더 안의 모든 파일과 `src` 폴더를 업로드합니다.
6. `Commit changes`를 누릅니다.

중요: ZIP 파일 하나만 올리면 안 됩니다. 압축을 푼 뒤 안의 파일들을 올려야 합니다.

## 2. Vercel에 배포하는 방법

1. Vercel.com에 로그인합니다.
2. `Add New` → `Project`를 누릅니다.
3. GitHub 저장소 `koreacoindesk`를 선택합니다.
4. 설정은 보통 자동으로 잡힙니다.
   - Framework Preset: Vite
   - Build Command: npm run build
   - Output Directory: dist
5. `Deploy`를 누릅니다.
6. 배포가 끝나면 `koreacoindesk.vercel.app` 또는 비슷한 무료 주소가 생깁니다.

## 3. 카카오톡/텔레그램 링크 바꾸기

`src/App.jsx` 파일 위쪽에 아래 부분이 있습니다.

```js
const KAKAO_OPENCHAT_URL = 'https://open.kakao.com/o/sample'
const TELEGRAM_URL = 'https://t.me/sample'
```

여기에서 `sample` 주소를 본인의 실제 상담 링크로 바꾸면 됩니다.

## 4. 주의

이 사이트는 샘플 화면입니다. 실제 돈이나 코인을 처리하려면 다음이 필요합니다.

- 사업자 정보
- 이용약관
- 개인정보처리방침
- 환불/취소 규정
- 본인확인 절차
- 자금세탁 방지 절차
- 관리자 보안
- 신청자 개인정보 암호화 저장
