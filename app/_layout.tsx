/**
 * _layout.tsx
 * 앱 전체 레이아웃 및 라우팅 설정
 * 모든 화면에 공통으로 적용되는 설정
 */

import React from 'react';
import { Stack } from '@apps-in-toss/framework';

/**
 * 루트 레이아웃 컴포넌트
 * 화면 전환 애니메이션 및 공통 네비게이션 설정
 */
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
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
      }}
    >
      {/* Step 1: 성별 선택 */}
      <Stack.Screen
        name="index"
        options={{
          title: '성별 선택',
        }}
      />
      
      {/* Step 2: 신체 크기 선택 */}
      <Stack.Screen
        name="step2"
        options={{
          title: '신체 크기',
        }}
      />
      
      {/* Step 3: 성향 선택 */}
      <Stack.Screen
        name="step3"
        options={{
          title: '운전 성향',
        }}
      />
      
      {/* Step 4: 예산 선택 */}
      <Stack.Screen
        name="step4"
        options={{
          title: '예산 범위',
        }}
      />
      
      {/* Step 5: 결과 화면 */}
      <Stack.Screen
        name="result"
        options={{
          title: '탐색 결과',
          // 결과 화면에서는 뒤로가기 제스처 비활성화
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
