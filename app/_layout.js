import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack } from '@apps-in-toss/framework';
/**
 * 루트 레이아웃 컴포넌트
 * 화면 전환 애니메이션 및 공통 네비게이션 설정
 */
export default function RootLayout() {
    return (_jsxs(Stack, { screenOptions: {
            // 헤더 숨김 (커스텀 헤더 사용)
            headerShown: false,
            // 화면 전환 애니메이션
            animation: 'slide_from_right',
            // 제스처로 뒤로가기 활성화
            gestureEnabled: true,
            // 배경색
            contentStyle: {
                backgroundColor: '#FFFFFF',
            },
        }, children: [_jsx(Stack.Screen, { name: "index", options: {
                    title: '성별 선택',
                } }), _jsx(Stack.Screen, { name: "step2", options: {
                    title: '신체 크기',
                } }), _jsx(Stack.Screen, { name: "step3", options: {
                    title: '운전 성향',
                } }), _jsx(Stack.Screen, { name: "step4", options: {
                    title: '예산 범위',
                } }), _jsx(Stack.Screen, { name: "result", options: {
                    title: '추천 결과',
                    // 결과 화면에서는 뒤로가기 제스처 비활성화
                    gestureEnabled: false,
                } })] }));
}
