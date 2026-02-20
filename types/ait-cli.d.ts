/**
 * ait-cli.d.ts
 * @apps-in-toss/cli 타입 선언 파일
 * AIT CLI 설정 관련 타입 정의
 */

declare module '@apps-in-toss/cli' {
  /**
   * AIT 설정 정의 함수
   */
  export function defineAITConfig(config: AITConfig): AITConfig;

  /**
   * AIT 설정 타입
   */
  export interface AITConfig {
    /** 앱 기본 정보 */
    app: AppConfig;
    /** 테마 설정 */
    theme?: ThemeConfig;
    /** 빌드 설정 */
    build?: BuildConfig;
    /** 개발 서버 설정 */
    dev?: DevConfig;
    /** 권한 설정 */
    permissions?: PermissionsConfig;
    /** SDK 기능 설정 */
    features?: FeaturesConfig;
    /** 네비게이션 설정 */
    navigation?: NavigationConfig;
    /** 에셋 설정 */
    assets?: AssetsConfig;
    /** 환경별 설정 */
    env?: EnvConfig;
    /** 토스 콘솔 설정 */
    console?: ConsoleConfig;
    /** 플러그인 */
    plugins?: Plugin[];
    /** 훅 */
    hooks?: HooksConfig;
  }

  /** 앱 기본 정보 */
  export interface AppConfig {
    /** 앱 고유 식별자 */
    id: string;
    /** 앱 표시 이름 */
    name: string;
    /** 앱 버전 */
    version: string;
    /** 앱 설명 */
    description?: string;
    /** 앱 카테고리 */
    category?: 'lifestyle' | 'finance' | 'entertainment' | 'utility' | 'social' | 'other';
    /** 앱 태그 */
    tags?: string[];
  }

  /** 테마 설정 */
  export interface ThemeConfig {
    /** 대표 색상 */
    primaryColor?: string;
    /** 아이콘 배경색 */
    iconBackgroundColor?: string;
    /** 상태바 스타일 */
    statusBarStyle?: 'light' | 'dark';
  }

  /** 빌드 설정 */
  export interface BuildConfig {
    /** 출력 디렉토리 */
    outDir?: string;
    /** 소스맵 생성 여부 */
    sourcemap?: boolean;
    /** 최소화 여부 */
    minify?: boolean;
    /** 타겟 플랫폼 */
    target?: ('ios' | 'android')[];
  }

  /** 개발 서버 설정 */
  export interface DevConfig {
    /** 포트 */
    port?: number;
    /** 호스트 */
    host?: string;
    /** HTTPS 사용 여부 */
    https?: boolean;
  }

  /** 권한 설정 */
  export interface PermissionsConfig {
    /** 필수 권한 */
    required?: string[];
    /** 선택 권한 */
    optional?: string[];
  }

  /** 기능 설정 */
  export interface FeaturesConfig {
    /** 공유 기능 */
    share?: boolean;
    /** 분석 기능 */
    analytics?: boolean;
    /** 푸시 알림 */
    push?: boolean;
    /** 딥링크 */
    deepLink?: boolean;
  }

  /** 네비게이션 설정 */
  export interface NavigationConfig {
    /** 초기 라우트 */
    initialRoute?: string;
    /** 애니메이션 */
    animation?: 'slide' | 'fade' | 'none';
    /** 헤더 표시 여부 */
    headerShown?: boolean;
    /** 제스처 뒤로가기 */
    gestureEnabled?: boolean;
  }

  /** 에셋 설정 */
  export interface AssetsConfig {
    /** 앱 아이콘 */
    icon?: string;
    /** 스플래시 이미지 */
    splash?: string;
    /** 스크린샷 */
    screenshots?: string[];
  }

  /** 환경별 설정 */
  export interface EnvConfig {
    development?: {
      debug?: boolean;
      logLevel?: 'verbose' | 'debug' | 'info' | 'warn' | 'error';
    };
    production?: {
      debug?: boolean;
      logLevel?: 'verbose' | 'debug' | 'info' | 'warn' | 'error';
    };
  }

  /** 콘솔 설정 */
  export interface ConsoleConfig {
    /** 팀 ID */
    teamId?: string;
    /** 심사 관련 정보 */
    review?: {
      testAccount?: {
        id: string;
        password: string;
      } | null;
      notes?: string;
    };
  }

  /** 플러그인 */
  export interface Plugin {
    name: string;
    options?: Record<string, unknown>;
  }

  /** 훅 설정 */
  export interface HooksConfig {
    /** 빌드 전 */
    preBuild?: () => void | Promise<void>;
    /** 빌드 후 */
    postBuild?: () => void | Promise<void>;
    /** 배포 전 */
    preDeploy?: () => void | Promise<void>;
    /** 배포 후 */
    postDeploy?: () => void | Promise<void>;
  }
}
