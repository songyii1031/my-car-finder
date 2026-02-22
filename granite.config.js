/**
 * granite.config.ts
 * 앱인토스 미니앱 설정 파일
 * Granite 프레임워크 기반 설정
 */
import { defineConfig } from '@apps-in-toss/framework';
export default defineConfig({
    // 앱 기본 정보
    app: {
        // 앱 식별자 (영문, 하이픈 사용)
        name: 'my-car-finder',
        // 사용자에게 표시되는 앱 이름
        displayName: '차BTI',
        // 앱 버전
        version: '1.0.0',
        // 앱 설명
        description: '나에게 어울리는 자동차를 찾아주는 큐레이션 미니앱',
    },
    // 테마 설정
    theme: {
        // 대표 색상 (토스 블루)
        primaryColor: '#1B4FFF',
        // 배경 색상
        backgroundColor: '#FFFFFF',
        // 텍스트 색상
        textColor: '#191F28',
        // 서브 텍스트 색상
        subTextColor: '#8B95A1',
        // 보더 색상
        borderColor: '#E5E8EB',
        // 에러 색상
        errorColor: '#F04452',
        // 성공 색상
        successColor: '#00C471',
    },
    // 라우팅 설정
    routes: {
        // 진입점
        initialRoute: '/',
        // 화면 전환 애니메이션
        animation: 'slide',
    },
    // 네비게이션 설정
    navigation: {
        // 헤더 표시 여부
        headerShown: true,
        // 뒤로가기 제스처 활성화
        gestureEnabled: true,
    },
    // 권한 설정 (필요한 경우)
    permissions: [],
    // 앱인토스 SDK 설정
    sdk: {
        // 공유 기능 활성화
        shareEnabled: true,
        // 분석 기능 활성화
        analyticsEnabled: true,
    },
});
