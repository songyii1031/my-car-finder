/**
 * adConfig.ts
 * 광고 설정 파일
 * 실제 광고 ID는 여기에서 관리합니다.
 */
// 환경 설정
const isDevelopment = import.meta.env.DEV;
// 광고 ID 설정
// TODO: 실제 AdMob/AdSense 광고 ID로 교체하세요
export const AD_CONFIG = {
    // Google AdMob 보상형 광고 ID
    // 테스트용: ca-app-pub-3940256099942544/5224354917
    // 실제 ID로 교체 필요
    REWARDED_AD_UNIT_ID: isDevelopment
        ? 'ca-app-pub-3940256099942544/5224354917' // 테스트 광고 ID
        : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // 실제 광고 ID (교체 필요)
    // Google AdSense 퍼블리셔 ID
    // TODO: 실제 퍼블리셔 ID로 교체하세요
    ADSENSE_CLIENT_ID: 'ca-pub-XXXXXXXXXXXXXXXX',
    // 광고 로드 타임아웃 (ms)
    AD_LOAD_TIMEOUT: 10000,
    // 광고 시청 최소 시간 (ms) - 보상 지급 조건
    MIN_WATCH_TIME: 5000,
    // 광고 스킵 가능 시간 (ms)
    SKIP_DELAY: 5000,
};
