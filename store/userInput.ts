/**
 * userInput.ts
 * Zustand를 사용한 전역 상태 관리
 * 사용자 입력 데이터를 관리하는 스토어
 */

import { create } from 'zustand';

// 사용자 입력 타입 정의
export type Gender = 'male' | 'female' | 'none';
export type BodySize = 'small' | 'medium' | 'large';
export type Budget = 'under20' | '20to40' | '40to70' | 'over70';

// 성향 타입 정의
export type Preference =
  | 'sporty'      // 스포티한 드라이빙
  | 'family'      // 가족 중심
  | 'business'    // 비즈니스/출퇴근
  | 'eco'         // 친환경/연비
  | 'outdoor'     // 오프로드/아웃도어
  | 'costEffective'; // 가성비

// 사용자 입력 인터페이스
export interface UserInput {
  gender: Gender | null;
  bodySize: BodySize | null;
  preferences: Preference[];
  budget: Budget | null;
}

// 스토어 상태 인터페이스
interface UserInputState extends UserInput {
  // 현재 스텝 (1~5)
  currentStep: number;
  
  // 액션 메서드
  setGender: (gender: Gender) => void;
  setBodySize: (bodySize: BodySize) => void;
  togglePreference: (preference: Preference) => void;
  setBudget: (budget: Budget) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  
  // 유효성 검사
  isStepValid: (step: number) => boolean;
  canProceed: () => boolean;
}

// 초기 상태
const initialState: UserInput & { currentStep: number } = {
  gender: null,
  bodySize: null,
  preferences: [],
  budget: null,
  currentStep: 1,
};

/**
 * 사용자 입력 스토어
 * 각 스텝에서 입력받은 데이터를 전역으로 관리
 */
export const useUserInputStore = create<UserInputState>((set, get) => ({
  ...initialState,

  // 성별 설정
  setGender: (gender: Gender) => {
    set({ gender });
  },

  // 신체 크기 설정
  setBodySize: (bodySize: BodySize) => {
    set({ bodySize });
  },

  // 성향 토글 (최대 2개까지 선택 가능)
  togglePreference: (preference: Preference) => {
    const { preferences } = get();
    const index = preferences.indexOf(preference);

    if (index > -1) {
      // 이미 선택된 경우 제거
      set({
        preferences: preferences.filter((p) => p !== preference),
      });
    } else if (preferences.length < 2) {
      // 2개 미만인 경우 추가
      set({
        preferences: [...preferences, preference],
      });
    }
    // 이미 2개 선택된 경우 무시
  },

  // 예산 설정
  setBudget: (budget: Budget) => {
    set({ budget });
  },

  // 스텝 직접 설정
  setStep: (step: number) => {
    if (step >= 1 && step <= 5) {
      set({ currentStep: step });
    }
  },

  // 다음 스텝으로 이동
  nextStep: () => {
    const { currentStep, canProceed } = get();
    if (canProceed() && currentStep < 5) {
      set({ currentStep: currentStep + 1 });
    }
  },

  // 이전 스텝으로 이동
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },

  // 전체 초기화
  reset: () => {
    set(initialState);
  },

  // 특정 스텝의 유효성 검사
  isStepValid: (step: number) => {
    const state = get();

    switch (step) {
      case 1:
        return state.gender !== null;
      case 2:
        return state.bodySize !== null;
      case 3:
        return state.preferences.length > 0; // 최소 1개 이상 선택
      case 4:
        return state.budget !== null;
      case 5:
        return true; // 결과 화면은 항상 유효
      default:
        return false;
    }
  },

  // 다음 스텝으로 진행 가능 여부
  canProceed: () => {
    const { currentStep, isStepValid } = get();
    return isStepValid(currentStep);
  },
}));

// 성향 옵션 데이터 (UI에서 사용)
export const preferenceOptions: {
  value: Preference;
  label: string;
  emoji: string;
}[] = [
  { value: 'sporty', label: '스포티한 드라이빙을 즐긴다', emoji: '🏎️' },
  { value: 'family', label: '가족과 함께 넓게 타고 싶다', emoji: '👨‍👩‍👧' },
  { value: 'business', label: '비즈니스/출퇴근 중심이다', emoji: '💼' },
  { value: 'eco', label: '친환경/연비를 중시한다', emoji: '🌿' },
  { value: 'outdoor', label: '오프로드·아웃도어를 즐긴다', emoji: '🚵' },
  { value: 'costEffective', label: '가성비가 최우선이다', emoji: '💰' },
];

// 성별 옵션 데이터
export const genderOptions: {
  value: Gender;
  label: string;
  emoji: string;
}[] = [
  { value: 'male', label: '남성', emoji: '👨' },
  { value: 'female', label: '여성', emoji: '👩' },
  { value: 'none', label: '선택 안 함', emoji: '🙂' },
];

// 신체 크기 옵션 데이터
export const bodySizeOptions: {
  value: BodySize;
  label: string;
  description: string;
}[] = [
  { value: 'small', label: '소형', description: '160cm 이하' },
  { value: 'medium', label: '중형', description: '160~175cm' },
  { value: 'large', label: '대형', description: '175cm 이상' },
];

// 예산 옵션 데이터
export const budgetOptions: {
  value: Budget;
  label: string;
  emoji: string;
}[] = [
  { value: 'under20', label: '2천만원 이하', emoji: '💵' },
  { value: '20to40', label: '2~4천만원', emoji: '💴' },
  { value: '40to70', label: '4~7천만원', emoji: '💶' },
  { value: 'over70', label: '7천만원 이상', emoji: '💎' },
];
