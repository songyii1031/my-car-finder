/**
 * theme.ts
 * 토스 디자인 시스템 기반 테마 상수
 */
// 토스 컬러 팔레트
export const colors = {
    // 메인 컬러
    primary: '#1B4FFF', // 토스 블루 (대표 색상)
    primaryLight: '#4D7CFF', // 밝은 블루
    primaryDark: '#0038D9', // 어두운 블루
    // 그레이스케일
    gray900: '#191F28', // 가장 진한 텍스트
    gray700: '#4E5968', // 서브 텍스트
    gray600: '#6B7684', // 비활성 텍스트
    gray500: '#8B95A1', // 플레이스홀더
    gray400: '#B0B8C1', // 구분선 (진한)
    gray300: '#D1D6DB', // 구분선
    gray200: '#E5E8EB', // 배경 구분
    gray100: '#F2F4F6', // 연한 배경
    gray50: '#F9FAFB', // 가장 연한 배경
    // 화이트
    white: '#FFFFFF',
    // 상태 컬러
    error: '#F04452', // 에러/경고
    success: '#00C471', // 성공
    warning: '#FF9500', // 주의
    // 배경
    background: '#FFFFFF',
    backgroundSecondary: '#F2F4F6',
};
// 타이포그래피
export const typography = {
    // 폰트 패밀리
    fontFamily: {
        default: 'Toss Product Sans, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    // 폰트 크기
    fontSize: {
        h1: 28,
        h2: 24,
        h3: 20,
        h4: 18,
        body1: 16,
        body2: 15,
        body3: 14,
        caption: 13,
        small: 12,
    },
    // 폰트 두께
    fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },
    // 줄 높이
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },
};
// 간격
export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 40,
};
// 보더 반경
export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
};
// 그림자
export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
};
// 애니메이션 설정
export const animation = {
    duration: {
        fast: 150,
        normal: 250,
        slow: 350,
    },
    easing: {
        easeInOut: 'ease-in-out',
        easeOut: 'ease-out',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
};
// 기본 테마 객체
const theme = {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    animation,
};
export default theme;
