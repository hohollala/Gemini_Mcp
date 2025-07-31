export const ERROR_MESSAGES = {
  NO_PROMPT_PROVIDED: "프롬프트가 제공되지 않았습니다.",
  GEMINI_CLI_NOT_FOUND: "Gemini CLI가 설치되지 않았습니다. https://github.com/google-gemini/gemini-cli 에서 설치해주세요.",
  EXECUTION_FAILED: "Gemini CLI 실행에 실패했습니다.",
  INVALID_MODEL: "유효하지 않은 모델입니다.",
} as const;

export const STATUS_MESSAGES = {
  EXECUTING: "Gemini CLI 실행 중...",
  COMPLETED: "실행 완료",
  PROCESSING: "처리 중...",
} as const;

export const MODELS = {
  DEFAULT: "gemini-2.0-flash-exp",
  PRO: "gemini-2.0-flash-exp",
  FLASH: "gemini-2.0-flash-exp",
} as const;

export const CLI = {
  COMMAND: "gemini",
  SANDBOX_FLAG: "-s",
  MODEL_FLAG: "-m",
  PROMPT_FLAG: "-p",
} as const;

export const PROTOCOL = {
  KEEPALIVE_INTERVAL: 25000, // 25 seconds
  NOTIFICATIONS: {
    PROGRESS: "notifications/progress",
  },
} as const;

export interface ToolArguments {
  prompt?: string;
  model?: string;
  sandbox?: boolean;
  message?: string;
  [key: string]: any;
} 