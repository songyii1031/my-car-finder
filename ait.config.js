/**
 * ait.config.ts
 * Apps-in-Toss (AIT) 미니앱 설정 파일
 * 토스 앱인토스 플랫폼 배포를 위한 설정
 */
import { defineAITConfig } from '@apps-in-toss/cli';
export default defineAITConfig({
    // 앱 기본 정보
    app: {
        // 앱 고유 식별자 (영문 소문자, 하이픈만 사용)
        id: 'my-car-finder',
        // 사용자에게 표시되는 앱 이름
        name: '차BTI',
        // 앱 버전 (시맨틱 버저닝)
        version: '1.0.0',
        // 앱 설명
        description: '나에게 딱 맞는 자동차를 찾아드려요. 성향, 체형, 예산에 맞춰 어울리는 차종을 안내합니다.',
        // 앱 카테고리
        category: 'lifestyle',
        // 앱 태그 (검색용)
        tags: ['자동차', '큐레이션', '차량', '구매', '매칭'],
    },
    // 테마 설정
    theme: {
        // 대표 색상 (토스 블루)
        primaryColor: '#1B4FFF',
        // 앱 아이콘 배경색
        iconBackgroundColor: '#1B4FFF',
        // 상태바 스타일
        statusBarStyle: 'dark',
    },
    // 빌드 설정
    build: {
        // 빌드 출력 디렉토리
        outDir: 'dist',
        // 소스맵 생성 여부
        sourcemap: false,
        // 최소화 여부
        minify: true,
        // 타겟 플랫폼
        target: ['ios', 'android'],
    },
    // 개발 서버 설정
    dev: {
        // 개발 서버 포트
        port: 3000,
        // 호스트
        host: 'localhost',
        // HTTPS 사용 여부
        https: false,
    },
    // 권한 설정
    permissions: {
        // 필요한 권한 목록
        required: [],
        // 선택적 권한 목록
        optional: [],
    },
    // SDK 기능 설정
    features: {
        // 공유 기능 활성화
        share: true,
        // 분석 기능 활성화
        analytics: true,
        // 푸시 알림
        push: false,
        // 딥링크
        deepLink: true,
    },
    // 네비게이션 설정
    navigation: {
        // 초기 라우트
        initialRoute: '/',
        // 화면 전환 애니메이션
        animation: 'slide',
        // 헤더 표시 여부
        headerShown: false,
        // 제스처로 뒤로가기 활성화
        gestureEnabled: true,
    },
    // 앱 아이콘 및 스플래시 설정
    assets: {
        // 앱 아이콘 경로
        icon: './assets/icon.png',
        // 스플래시 이미지 경로
        splash: './assets/splash.png',
        // 스크린샷 경로들
        screenshots: [
            './assets/screenshots/step1.png',
            './assets/screenshots/step2.png',
            './assets/screenshots/step3.png',
            './assets/screenshots/result.png',
        ],
    },
    // 환경별 설정
    env: {
        development: {
            // 개발 환경 설정
            debug: true,
            logLevel: 'verbose',
        },
        production: {
            // 프로덕션 환경 설정
            debug: false,
            logLevel: 'error',
        },
    },
    // 토스 앱인토스 콘솔 설정
    console: {
        // 팀 ID (토스 개발자 콘솔에서 확인)
        teamId: '',
        // 앱 심사 관련 정보
        review: {
            // 심사용 테스트 계정 (필요한 경우)
            testAccount: null,
            // 심사 참고사항
            notes: '별도의 로그인 없이 사용 가능한 차량 매칭 서비스입니다. 특정 브랜드/제조사와 제휴 관계가 없습니다.',
        },
    },
    // 플러그인 설정
    plugins: [],
    // 훅 설정
    hooks: {
        // 빌드 전 실행
        preBuild: async () => {
            console.log('🚗 차BTI 앱 빌드를 시작합니다...');
        },
        // 빌드 후 실행
        postBuild: async () => {
            console.log('✅ 빌드가 완료되었습니다!');
        },
    },
});
