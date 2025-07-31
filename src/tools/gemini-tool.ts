import { z } from 'zod';
import { UnifiedTool } from './registry.js';
import { executeGeminiCLI } from '../utils/geminiExecutor.js';
import { ERROR_MESSAGES } from '../constants.js';
import { Logger } from '../utils/logger.js';

const geminiArgsSchema = z.object({
  prompt: z.string().min(1).describe("Gemini에게 전달할 프롬프트나 질문. @filename 구문으로 파일을 포함할 수 있습니다."),
  model: z.string().optional().describe("사용할 모델 (예: 'gemini-2.0-flash-exp'). 지정하지 않으면 기본 모델을 사용합니다."),
  sandbox: z.boolean().default(false).describe("샌드박스 모드 사용 (-s 플래그). 안전한 코드 실행을 위한 격리된 환경에서 실행합니다."),
});

export const geminiTool: UnifiedTool = {
  name: "gc-ask",
  description: "Gemini CLI를 통해 AI와 상호작용합니다. 모델 선택, 샌드박스 모드, 파일 분석을 지원합니다.",
  zodSchema: geminiArgsSchema,
  prompt: {
    description: "Gemini CLI를 실행하여 AI 응답을 받습니다. 파일 분석과 코드 실행을 지원합니다.",
  },
  category: 'gemini',
  execute: async (args, onProgress) => {
    const { prompt, model, sandbox } = args;
    
    if (!prompt?.trim()) {
      throw new Error(ERROR_MESSAGES.NO_PROMPT_PROVIDED);
    }

    Logger.info(`Executing Gemini tool with prompt: ${prompt}`, { model, sandbox });

    try {
      const result = await executeGeminiCLI(
        prompt as string,
        model as string | undefined,
        !!sandbox,
        onProgress
      );

      return result;
    } catch (error) {
      Logger.error('Gemini tool execution failed', error);
      throw error;
    }
  }
}; 