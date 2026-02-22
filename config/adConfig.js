/**
 * adConfig.js
 * 광고 설정 파일
 * 실제 광고 ID는 여기에서 관리합니다.
 */

// Mock 광고 사용 여부
// true: 시뮬레이션 광고 (개발/테스트용) - 타이머 후 자동으로 보상 지급
// false: AIT 광고 SDK 연동 (실제 광고 ID 사용)
export const USE_MOCK_AD = false;

// 환경 설정
const isDevelopment = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// AIT 광고 SDK 사용 가능 여부 (토스 컨테이너 내부에서만 true)
export const isAITAvailable = () => {
    return typeof window !== 'undefined' && !!window.ait?.ad;
};

// 광고 ID 설정
export const AD_CONFIG = {
    // AIT 보상형 광고 Unit ID (실제)
    REWARDED_AD_UNIT_ID: 'ait.v2.live.c611c091ba8b4f5c',
    // 광고 로드 타임아웃 (ms)
    AD_LOAD_TIMEOUT: 10000,
    // 광고 시청 최소 시간 (ms) - 보상 지급 조건
    MIN_WATCH_TIME: 5000,
    // 광고 스킵 가능 시간 (ms)
    SKIP_DELAY: 5000,
    // Mock 광고 로드 시간 (ms) - 개발 환경 폴백용
    MOCK_LOAD_TIME: 1000,
};
