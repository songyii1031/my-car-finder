# 내 차를 찾아줘 (my-car-finder)

사용자의 성향, 성별, 신체 크기를 입력받아 가장 잘 맞는 자동차 종류를 추천해주는 토스 앱인토스(Apps-in-Toss) 미니앱입니다.

## 스크린샷

```
Step 1: 성별 선택 → Step 2: 신체 크기 → Step 3: 성향 → Step 4: 예산 → 결과
```

## 기술 스택

- **프레임워크**: React Native + @apps-in-toss/framework (Granite 기반)
- **언어**: TypeScript (Strict Mode)
- **상태 관리**: Zustand
- **디자인**: TDS (Toss Design System) 스타일 컴포넌트

## 프로젝트 구조

```
my-car-finder/
├── granite.config.ts          # 앱인토스 설정 파일
├── package.json               # 의존성 관리
├── tsconfig.json              # TypeScript 설정
├── app/
│   ├── index.tsx              # Step 1 - 성별 선택
│   ├── step2.tsx              # Step 2 - 신체 크기 선택
│   ├── step3.tsx              # Step 3 - 성향 선택 (다중 선택)
│   ├── step4.tsx              # Step 4 - 예산 범위 선택
│   └── result.tsx             # Step 5 - 결과 화면
├── components/
│   ├── index.ts               # 컴포넌트 통합 export
│   ├── StepBar.tsx            # 진행률 표시 바
│   ├── SelectCard.tsx         # 카드형 선택 버튼
│   ├── CarResultCard.tsx      # 결과 카드
│   ├── Button.tsx             # 토스 스타일 버튼
│   └── ScreenContainer.tsx    # 화면 공통 래퍼
├── utils/
│   └── recommend.ts           # 자동차 추천 로직
├── store/
│   └── userInput.ts           # Zustand 전역 상태 관리
└── styles/
    └── theme.ts               # 토스 디자인 시스템 테마
```

## 설치 및 실행

### 1. 의존성 설치

```bash
cd my-car-finder
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 빌드

```bash
npm run build
```

## 앱인토스 콘솔 등록 방법

### 1. 토스 개발자 콘솔 접속
- [토스 개발자 콘솔](https://developers.toss.im)에 접속합니다.
- 로그인 후 "Apps in Toss" 메뉴로 이동합니다.

### 2. 새 앱 생성
1. "새 앱 만들기" 버튼 클릭
2. 앱 정보 입력:
   - **앱 이름**: 내 차를 찾아줘
   - **앱 ID**: my-car-finder
   - **카테고리**: 라이프스타일 / 자동차
3. 앱 아이콘 및 스크린샷 업로드

### 3. 빌드 파일 업로드
```bash
# 빌드 생성
npm run build

# dist 폴더의 파일을 콘솔에 업로드
```

### 4. 심사 요청
- 모든 정보 입력 후 "심사 요청" 버튼 클릭
- 심사 완료 후 토스 앱에서 노출됩니다.

## 테스트 방법

### 로컬 테스트

1. **개발 서버 실행**
   ```bash
   npm run dev
   ```

2. **앱인토스 개발자 도구 연결**
   - 토스 앱 → 설정 → 개발자 옵션 → 미니앱 디버그 모드 활성화
   - QR 코드 스캔 또는 URL 입력으로 연결

### 시뮬레이터 테스트

```bash
# iOS
npm run ios

# Android
npm run android
```

### 단위 테스트

```bash
npm run test
```

## 주요 기능

### 1. 5단계 스텝 플로우
- **Step 1**: 성별 선택 (남성/여성/선택 안 함)
- **Step 2**: 신체 크기 선택 (소형/중형/대형)
- **Step 3**: 운전 성향 선택 (최대 2개 다중 선택)
- **Step 4**: 예산 범위 선택
- **Step 5**: 추천 결과 표시

### 2. 추천 로직
사용자 입력을 기반으로 1~3개의 자동차 카테고리를 추천합니다.

| 성향 | 예산 | 추천 결과 |
|------|------|----------|
| 스포티 | 높음 | 스포츠카/쿠페 (BMW 4시리즈, 포르쉐 카이맨) |
| 스포티 | 낮음 | 스포티 해치백 (아반떼 N라인, 벨로스터) |
| 가족 중심 | - | 미니밴/대형 SUV (카니발, 팰리세이드) |
| 비즈니스 | 높음 | 대형 세단 (제네시스 G80, BMW 5시리즈) |
| 비즈니스 | 낮음 | 준중형 세단 (아반떼, K3) |
| 친환경 | - | 전기차/하이브리드 (아이오닉6, 테슬라) |
| 오프로드 | - | SUV/픽업트럭 (모하비, 랜드로버 디펜더) |
| 가성비 | - | 경차/소형차 또는 준중형 국내차 |

### 3. 토스 스타일 UI
- 진행률 표시 바
- 카드형 선택 UI
- 슬라이드 애니메이션
- 토스 블루(#1B4FFF) 하이라이트

### 4. 공유 기능
- 앱인토스 share API를 활용한 결과 공유

## 설정 파일 (granite.config.ts)

```typescript
export default defineConfig({
  app: {
    name: 'my-car-finder',
    displayName: '내 차를 찾아줘',
    version: '1.0.0',
  },
  theme: {
    primaryColor: '#1B4FFF', // 토스 블루
  },
  routes: {
    initialRoute: '/',
    animation: 'slide',
  },
});
```

## 라이선스

MIT License

## 문의

앱인토스 개발 관련 문의는 토스 개발자 콘솔을 통해 접수해주세요.
