/**
 * apps-in-toss.d.ts
 * @apps-in-toss/framework 타입 선언 파일
 * 앱인토스 SDK의 타입을 정의합니다.
 */

declare module '@apps-in-toss/framework' {
  /**
   * Granite 설정 정의 함수
   */
  export function defineConfig(config: GraniteConfig): GraniteConfig;

  /**
   * Granite 설정 타입
   */
  export interface GraniteConfig {
    app: {
      name: string;
      displayName: string;
      version: string;
      description?: string;
    };
    theme: {
      primaryColor: string;
      backgroundColor?: string;
      textColor?: string;
      subTextColor?: string;
      borderColor?: string;
      errorColor?: string;
      successColor?: string;
    };
    routes: {
      initialRoute: string;
      animation?: 'slide' | 'fade' | 'none';
    };
    navigation?: {
      headerShown?: boolean;
      gestureEnabled?: boolean;
    };
    permissions?: string[];
    sdk?: {
      shareEnabled?: boolean;
      analyticsEnabled?: boolean;
    };
  }

  /**
   * 라우터 훅
   * 화면 전환 및 네비게이션 기능 제공
   */
  export function useRouter(): Router;

  export interface Router {
    /** 새 화면으로 이동 (스택에 추가) */
    push: (path: string, params?: Record<string, unknown>) => void;
    /** 현재 화면을 새 화면으로 대체 */
    replace: (path: string, params?: Record<string, unknown>) => void;
    /** 이전 화면으로 돌아가기 */
    back: () => void;
    /** 특정 화면까지 되돌아가기 */
    popTo: (path: string) => void;
    /** 홈 화면으로 이동 */
    popToTop: () => void;
    /** 현재 경로 */
    pathname: string;
    /** 현재 파라미터 */
    params: Record<string, string>;
  }

  /**
   * 네비게이션 훅
   * 네비게이션 상태 및 옵션 관리
   */
  export function useNavigation(): Navigation;

  export interface Navigation {
    /** 헤더 옵션 설정 */
    setOptions: (options: NavigationOptions) => void;
    /** 뒤로가기 가능 여부 */
    canGoBack: () => boolean;
    /** 현재 포커스 상태 */
    isFocused: () => boolean;
  }

  export interface NavigationOptions {
    title?: string;
    headerShown?: boolean;
    headerBackTitle?: string;
    headerRight?: () => React.ReactNode;
    headerLeft?: () => React.ReactNode;
  }

  /**
   * 공유 기능 훅
   * 콘텐츠 공유 API
   */
  export function useShare(): (options: ShareOptions) => Promise<ShareResult>;

  export interface ShareOptions {
    /** 공유 제목 */
    title?: string;
    /** 공유 텍스트 */
    text?: string;
    /** 공유 URL */
    url?: string;
    /** 공유 이미지 (Base64 또는 URL) */
    image?: string;
  }

  export interface ShareResult {
    /** 공유 성공 여부 */
    success: boolean;
    /** 공유 방법 (카카오톡, 메시지 등) */
    method?: string;
  }

  /**
   * 분석 이벤트 훅
   */
  export function useAnalytics(): Analytics;

  export interface Analytics {
    /** 이벤트 로깅 */
    logEvent: (eventName: string, params?: Record<string, unknown>) => void;
    /** 화면 조회 로깅 */
    logScreenView: (screenName: string) => void;
  }

  /**
   * 사용자 정보 훅
   */
  export function useUser(): User | null;

  export interface User {
    /** 사용자 ID (익명화) */
    id: string;
    /** 닉네임 (설정된 경우) */
    nickname?: string;
  }

  /**
   * 토스트 메시지 훅
   */
  export function useToast(): Toast;

  export interface Toast {
    /** 일반 토스트 표시 */
    show: (message: string, duration?: number) => void;
    /** 성공 토스트 표시 */
    success: (message: string, duration?: number) => void;
    /** 에러 토스트 표시 */
    error: (message: string, duration?: number) => void;
  }

  /**
   * 로딩 인디케이터 훅
   */
  export function useLoading(): Loading;

  export interface Loading {
    /** 로딩 표시 */
    show: (message?: string) => void;
    /** 로딩 숨김 */
    hide: () => void;
  }

  /**
   * 다이얼로그 훅
   */
  export function useDialog(): Dialog;

  export interface Dialog {
    /** 알림 다이얼로그 */
    alert: (options: AlertOptions) => Promise<void>;
    /** 확인 다이얼로그 */
    confirm: (options: ConfirmOptions) => Promise<boolean>;
  }

  export interface AlertOptions {
    title?: string;
    message: string;
    buttonText?: string;
  }

  export interface ConfirmOptions {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
  }

  /**
   * Stack 네비게이터 컴포넌트
   * 화면 스택 관리 및 전환 애니메이션 제공
   */
  export const Stack: StackNavigator;

  export interface StackNavigator {
    (props: StackProps): JSX.Element;
    Screen: (props: ScreenProps) => JSX.Element;
  }

  export interface StackProps {
    children?: React.ReactNode;
    screenOptions?: ScreenOptions;
  }

  export interface ScreenProps {
    name: string;
    options?: ScreenOptions;
    children?: React.ReactNode;
  }

  export interface ScreenOptions {
    title?: string;
    headerShown?: boolean;
    animation?: 'slide_from_right' | 'slide_from_left' | 'slide_from_bottom' | 'fade' | 'none';
    gestureEnabled?: boolean;
    contentStyle?: {
      backgroundColor?: string;
    };
  }
}

declare module '@apps-in-toss/tds' {
  import { FC, ReactNode } from 'react';
  import { ViewStyle, TextStyle } from 'react-native';

  /**
   * TDS Button 컴포넌트
   */
  export const Button: FC<{
    children: ReactNode;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'text';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    style?: ViewStyle;
  }>;

  /**
   * TDS Text 컴포넌트
   */
  export const Text: FC<{
    children: ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'caption';
    color?: string;
    style?: TextStyle;
  }>;

  /**
   * TDS Card 컴포넌트
   */
  export const Card: FC<{
    children: ReactNode;
    onPress?: () => void;
    selected?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
  }>;

  /**
   * TDS Spacing 컴포넌트
   */
  export const Spacing: FC<{
    size: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  }>;

  /**
   * TDS Divider 컴포넌트
   */
  export const Divider: FC<{
    color?: string;
    thickness?: number;
    style?: ViewStyle;
  }>;

  /**
   * TDS ProgressBar 컴포넌트
   */
  export const ProgressBar: FC<{
    progress: number; // 0 ~ 1
    color?: string;
    backgroundColor?: string;
    height?: number;
    style?: ViewStyle;
  }>;
}
