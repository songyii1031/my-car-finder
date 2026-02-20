/**
 * recommend.ts
 * 자동차 매칭 로직
 * 사용자 입력을 기반으로 어울리는 자동차 종류를 안내
 */

import type { Gender, BodySize, Budget, Preference } from '../store/userInput';

// 사용자 입력 타입
export interface UserInput {
  gender: Gender;
  bodySize: BodySize;
  preferences: Preference[]; // 최대 2개
  budget: Budget;
}

// 자동차 매칭 결과 타입
export interface CarRecommendation {
  category: string;       // 예: "준중형 세단"
  origin: string;         // "국내차" | "외제차" | "국내/외제차 모두"
  example: string;        // 예: "현대 아반떼, 기아 K3"
  reason: string;         // 선정 이유 1~2문장
  emoji: string;          // 대표 이모지
  priority: number;       // 우선순위 (높을수록 먼저 표시)
}

// 예산 레벨 변환 (비교 연산용)
const budgetLevel: Record<Budget, number> = {
  under20: 1,
  '20to40': 2,
  '40to70': 3,
  over70: 4,
};

// 예산이 높은지 확인 (4~7천만원 이상)
const isHighBudget = (budget: Budget): boolean => budgetLevel[budget] >= 3;

// 예산이 낮은지 확인 (2~4천만원 이하)
const isLowBudget = (budget: Budget): boolean => budgetLevel[budget] <= 2;

// 예산이 매우 높은지 확인 (7천만원 이상)
const isVeryHighBudget = (budget: Budget): boolean => budgetLevel[budget] >= 4;

// 예산이 매우 낮은지 확인 (2천만원 이하)
const isVeryLowBudget = (budget: Budget): boolean => budgetLevel[budget] === 1;

/**
 * 메인 매칭 함수
 * 사용자 입력을 받아 1~3개의 어울리는 자동차 카테고리를 안내
 */
export function recommendCars(input: UserInput): CarRecommendation[] {
  const { gender, bodySize, preferences, budget } = input;
  const recommendations: CarRecommendation[] = [];

  // 선호도 확인 헬퍼
  const hasPreference = (pref: Preference): boolean => preferences.includes(pref);

  // 1. 스포티 성향 처리
  if (hasPreference('sporty')) {
    if (isHighBudget(budget)) {
      recommendations.push({
        category: '스포츠카/쿠페',
        origin: '외제차',
        example: 'BMW 4시리즈, 포르쉐 카이맨, 아우디 TT',
        reason: '스포티한 드라이빙을 즐기시는 분께 최고의 주행 경험을 선사합니다. 파워풀한 엔진과 정교한 핸들링이 특징입니다.',
        emoji: '🏎️',
        priority: 10,
      });
    }
    if (isLowBudget(budget)) {
      recommendations.push({
        category: '스포티 해치백',
        origin: '국내차',
        example: '현대 아반떼 N라인, 현대 벨로스터 N, 기아 스팅어',
        reason: '합리적인 가격에 스포티한 감성을 느낄 수 있습니다. 국내차 특유의 가성비와 편의사양이 돋보입니다.',
        emoji: '🚗',
        priority: 9,
      });
    }
  }

  // 2. 가족 중심 성향 처리
  if (hasPreference('family')) {
    recommendations.push({
      category: '미니밴/대형 SUV',
      origin: '국내차',
      example: '기아 카니발, 현대 팰리세이드, 기아 쏘렌토',
      reason: '넓은 실내 공간과 편안한 승차감으로 가족 여행에 최적화되어 있습니다. 다양한 시트 구성이 가능합니다.',
      emoji: '👨‍👩‍👧‍👦',
      priority: 10,
    });

    if (isHighBudget(budget)) {
      recommendations.push({
        category: '프리미엄 SUV',
        origin: '외제차',
        example: '볼보 XC90, 벤츠 GLS, BMW X5',
        reason: '최상의 안전 기능과 프리미엄 편의사양으로 가족의 안전과 편안함을 동시에 챙길 수 있습니다.',
        emoji: '🛡️',
        priority: 8,
      });
    }
  }

  // 3. 비즈니스 성향 처리
  if (hasPreference('business')) {
    if (isHighBudget(budget)) {
      recommendations.push({
        category: '대형 세단',
        origin: '국내/외제차 모두',
        example: '제네시스 G80, BMW 5시리즈, 벤츠 E클래스',
        reason: '품격 있는 외관과 고급스러운 실내로 비즈니스 미팅에 최적입니다. 뛰어난 승차감도 장점입니다.',
        emoji: '💼',
        priority: 10,
      });
    }
    if (isLowBudget(budget)) {
      recommendations.push({
        category: '준중형 세단',
        origin: '국내차',
        example: '현대 아반떼, 기아 K3, 현대 소나타',
        reason: '깔끔한 디자인과 연비 효율이 좋아 출퇴근용으로 적합합니다. 유지비 부담도 적습니다.',
        emoji: '🚘',
        priority: 9,
      });
    }
  }

  // 4. 친환경 성향 처리
  if (hasPreference('eco')) {
    if (isHighBudget(budget)) {
      recommendations.push({
        category: '프리미엄 전기차',
        origin: '국내/외제차 모두',
        example: '현대 아이오닉6, 테슬라 모델3, 기아 EV6',
        reason: '친환경적이면서도 첨단 기술이 집약되어 있습니다. 전기차 보조금 혜택도 받을 수 있습니다.',
        emoji: '⚡',
        priority: 10,
      });
    } else {
      recommendations.push({
        category: '하이브리드/소형 전기차',
        origin: '국내차',
        example: '현대 아이오닉, 기아 니로 HEV, 기아 레이 EV',
        reason: '연비가 뛰어나 유류비 절감에 효과적입니다. 친환경 차량 혜택도 누릴 수 있습니다.',
        emoji: '🌿',
        priority: 9,
      });
    }
  }

  // 5. 오프로드/아웃도어 성향 처리
  if (hasPreference('outdoor')) {
    if (isHighBudget(budget)) {
      recommendations.push({
        category: '정통 오프로더',
        origin: '국내/외제차 모두',
        example: '기아 모하비, 랜드로버 디펜더, 지프 랭글러',
        reason: '험한 지형도 거뜬히 소화하는 강력한 오프로드 성능을 갖추고 있습니다. 아웃도어 활동에 최적입니다.',
        emoji: '🏔️',
        priority: 10,
      });
    } else {
      recommendations.push({
        category: '중형 SUV',
        origin: '국내차',
        example: '현대 투싼, 기아 스포티지, 쌍용 토레스',
        reason: '도심과 야외 활동 모두 적합한 만능 SUV입니다. 적재 공간도 넉넉합니다.',
        emoji: '🚵',
        priority: 9,
      });
    }
  }

  // 6. 가성비 성향 처리
  if (hasPreference('costEffective')) {
    if (bodySize === 'small') {
      recommendations.push({
        category: '경차/소형차',
        origin: '국내차',
        example: '기아 모닝, 기아 레이, 현대 캐스퍼',
        reason: '구매 비용과 유지비가 저렴하고, 도심 주행과 주차에 유리합니다. 작은 체형에 최적화된 운전 포지션을 제공합니다.',
        emoji: '💰',
        priority: 10,
      });
    } else {
      recommendations.push({
        category: '준중형 국내차',
        origin: '국내차',
        example: '현대 아반떼, 현대 코나, 기아 셀토스',
        reason: '가성비가 뛰어나면서도 충분한 실내 공간을 제공합니다. 다양한 편의사양도 갖추고 있습니다.',
        emoji: '💵',
        priority: 9,
      });
    }
  }

  // 7. 신체 크기 기반 추가 안내
  if (bodySize === 'large' && recommendations.length < 3) {
    // 대형 체형은 넓은 차량 안내
    if (!hasPreference('costEffective') && !recommendations.some(r => r.category.includes('SUV') || r.category.includes('대형'))) {
      recommendations.push({
        category: '대형 SUV/세단',
        origin: '국내차',
        example: '현대 팰리세이드, 기아 쏘렌토, 제네시스 G80',
        reason: '큰 체형에 맞는 넓은 실내 공간과 편안한 시트 포지션을 제공합니다.',
        emoji: '🚙',
        priority: 5,
      });
    }
  }

  if (bodySize === 'small' && recommendations.length < 3) {
    // 소형 체형에 대형차 선택시 주의 안내
    if (!hasPreference('costEffective')) {
      recommendations.push({
        category: '컴팩트카/소형 SUV',
        origin: '국내차',
        example: '현대 캐스퍼, 기아 셀토스, 현대 베뉴',
        reason: '작은 체형에 맞는 운전 포지션과 조작 편의성을 제공합니다. 시야 확보가 용이합니다.',
        emoji: '🚗',
        priority: 5,
      });
    }
  }

  // 8. 기본 안내 (선호도가 명확하지 않은 경우)
  if (recommendations.length === 0) {
    // 예산별 기본 안내
    if (isVeryHighBudget(budget)) {
      recommendations.push({
        category: '프리미엄 세단/SUV',
        origin: '국내/외제차 모두',
        example: '제네시스 GV80, BMW X5, 벤츠 E클래스',
        reason: '높은 예산에 맞는 프리미엄 브랜드의 대표 모델들입니다. 품격과 성능을 모두 갖추고 있습니다.',
        emoji: '✨',
        priority: 7,
      });
    } else if (isVeryLowBudget(budget)) {
      recommendations.push({
        category: '경차/준중형차',
        origin: '국내차',
        example: '기아 모닝, 현대 아반떼, 기아 K3',
        reason: '합리적인 가격에 실용성을 갖춘 차량들입니다. 유지비 부담도 적습니다.',
        emoji: '💰',
        priority: 7,
      });
    } else {
      recommendations.push({
        category: '중형 세단/SUV',
        origin: '국내차',
        example: '현대 소나타, 기아 K5, 현대 투싼',
        reason: '가장 대중적이고 균형 잡힌 선택입니다. 다양한 옵션 구성이 가능합니다.',
        emoji: '🚘',
        priority: 7,
      });
    }
  }

  // 우선순위에 따라 정렬하고 상위 3개만 반환
  return recommendations
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);
}

/**
 * 결과에 대한 추가 조언 생성
 */
export function getAdditionalAdvice(input: UserInput): string[] {
  const { bodySize, budget } = input;
  const advice: string[] = [];

  // 신체 크기 관련 조언
  if (bodySize === 'small') {
    advice.push('시트 포지션 조절 범위가 넓은 차량을 선택하시면 더 편안한 운전이 가능합니다.');
  }

  if (bodySize === 'large') {
    advice.push('헤드룸과 레그룸이 충분한지 실제 시승을 통해 확인해보시는 것을 권장합니다.');
  }

  // 예산 관련 조언
  if (isVeryLowBudget(budget)) {
    advice.push('중고차 시장도 함께 살펴보시면 더 다양한 선택지를 찾으실 수 있습니다.');
  }

  if (isVeryHighBudget(budget)) {
    advice.push('프리미엄 브랜드의 경우 딜러십에서 다양한 금융 프로그램을 제공하니 상담받아보세요.');
  }

  return advice;
}

/**
 * 공유용 텍스트 생성
 */
export function generateShareText(recommendations: CarRecommendation[]): string {
  const topRecommendation = recommendations[0];
  
  if (!topRecommendation) {
    return '내 차를 찾아줘 앱에서 나에게 어울리는 차를 알아보세요!';
  }

  return `[내 차를 찾아줘 결과]\n\n` +
    `${topRecommendation.emoji} 어울리는 차종: ${topRecommendation.category}\n` +
    `참고 차종: ${topRecommendation.example}\n\n` +
    `나도 알아보러 가기 👉 (앱 링크)`;
}
