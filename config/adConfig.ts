/**
 * adConfig.ts
 * 광고 설정 파일
 * 실제 광고 ID는 여기에서 관리합니다.
 */

// Mock 광고 사용 여부
// true: 시뮬레이션 광고 (개발/테스트용) - 타이머 후 자동으로 보상 지급
// false: 실제 AdMob/AdSense SDK 연동 (실제 광고 ID 필요)
// TODO: 실제 광고 SDK 연동 후 false로 변경하세요
export const USE_MOCK_AD = true;

// 환경 설정
const isDevelopment = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// 광고 ID 설정
// TODO: 실제 AdMob/AdSense 광고 ID로 교체하세요
export const AD_CONFIG = {
  // Google AdMob 보상형 광고 ID
  // 테스트용: ca-app-pub-3940256099942544/5224354917
  // 실제 ID로 교체 필요
  REWARDED_AD_UNIT_ID: isDevelopment
    ? 'ca-app-pub-3940256099942544/5224354917'  // 테스트 광고 ID
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // 실제 광고 ID (교체 필요)

  // Google AdSense 퍼블리셔 ID
  // TODO: 실제 퍼블리셔 ID로 교체하세요
  ADSENSE_CLIENT_ID: 'ca-pub-XXXXXXXXXXXXXXXX',

  // 광고 로드 타임아웃 (ms)
  AD_LOAD_TIMEOUT: 10000,

  // 광고 시청 최소 시간 (ms) - 보상 지급 조건
  MIN_WATCH_TIME: USE_MOCK_AD ? 3000 : 5000,

  // 광고 스킵 가능 시간 (ms)
  SKIP_DELAY: USE_MOCK_AD ? 3000 : 5000,

  // Mock 광고 로드 시간 (ms)
  MOCK_LOAD_TIME: 1000,
};

// 광고 상태 타입
export type AdStatus = 'idle' | 'loading' | 'ready' | 'showing' | 'completed' | 'error' | 'skipped';

// 광고 에러 타입
export interface AdError {
  code: string;
  message: string;
}

// 광고 이벤트 콜백 타입
export interface AdCallbacks {
  onAdLoaded?: () => void;
  onAdFailedToLoad?: (error: AdError) => void;
  onAdOpened?: () => void;
  onAdClosed?: () => void;
  onRewarded?: () => void;
  onAdSkipped?: () => void;
}
